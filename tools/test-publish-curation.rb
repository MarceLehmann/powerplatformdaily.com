require 'tmpdir'
require 'jekyll'
require 'nokogiri'
require 'stringio'
require_relative 'publish-curation'

# Fixed publication time; the base article's source date is 8 days older.
NOW = Time.utc(2026, 9, 18)

def check(condition, message)
  raise message unless condition
end

def rejects
  yield
rescue ArgumentError, KeyError
  return
else
  raise 'Expected validation failure'
end

# Three plain-text question/answer pairs per language (10-35 words per answer), as the publisher expects them.
FAQ_PAIRS = {
  'en' => [
    ['How do CoE tools help find orphaned resources in the Power Platform?',
     'CoE tools list apps, flows and other resources together with their owners, so resources whose owner left the company show up in one place.'],
    ['Which permissions should an ownership review in the CoE cover?',
     'An ownership review compares who can edit or share each solution with who is still responsible for it today.'],
    ['Why should resource ownership be part of offboarding checks?',
     'When a person leaves, their apps and flows keep running but nobody is accountable for changes, licences or failures.'],
  ],
  'de' => [
    ['Wie finden CoE-Werkzeuge verwaiste Ressourcen in der Power Platform?',
     'CoE-Werkzeuge listen Apps, Flows und weitere Ressourcen zusammen mit ihren Verantwortlichen auf, sodass Ressourcen ohne aktiven Besitzer auffallen.'],
    ['Welche Berechtigungen gehören in eine Prüfung der Verantwortlichkeiten im CoE?',
     'Die Prüfung vergleicht, wer eine Lösung bearbeiten und teilen darf, mit der Person, die heute dafür zuständig ist.'],
    ['Warum gehört die Ressourcenverantwortung in die Offboarding-Checks?',
     'Wenn eine Person ausscheidet, laufen ihre Apps und Flows weiter, aber niemand verantwortet Änderungen, Lizenzen oder Fehler.'],
  ],
}.freeze

def faq_for(locale, variant: nil)
  FAQ_PAIRS.fetch(locale).map do |question, answer|
    { 'question' => variant ? question.sub('?', " (#{variant})?") : question, 'answer' => answer }
  end
end

def words(count)
  Array.new(count, 'word').join(' ')
end

def replace_first(faq, changes)
  faq.each_with_index.map { |item, index| index.zero? ? item.merge(changes) : item }
end

article = {
  'publishable' => true, 'source_url' => 'https://www.powerplatformtip.com/article/powerplatformtip/powerplatformtip-56-empowering-tools-in-coe/',
  'source_title' => '#PowerPlatformTip 56', 'source_name' => 'PowerPlatformTip', 'source_author' => 'Marcel Lehmann',
  'source_language' => 'en', 'source_published_at' => '2026-09-10', 'tags' => %w[power-automate roadmap],
  'card_topic' => 'Ownership', 'card_quote' => 'Ownership is a chain. Check the links before one breaks.',
  'card_take' => 'The owner leaves. The solution stays.', 'card_state' => 'Owned',
  'en' => { 'title' => 'CoE ownership reviews', 'description' => 'CoE tools support ownership reviews.', 'tldr' => 'CoE tools support reviews of permissions and orphaned resources.', 'takeaway' => "- Admins/CoE: include resource ownership in offboarding checks.\n- Security/Compliance: review orphaned resources on a fixed schedule.", 'faq' => faq_for('en') },
  'de' => { 'title' => 'CoE: Verantwortlichkeiten prüfen', 'description' => 'CoE-Werkzeuge unterstützen die Prüfung.', 'tldr' => 'CoE-Werkzeuge helfen bei der Prüfung von Berechtigungen und verwaisten Ressourcen.', 'takeaway' => "- Admins/CoE: Ressourcenverantwortung in Offboarding-Checks aufnehmen.\n- Security/Compliance: verwaiste Ressourcen nach festem Plan prüfen.", 'faq' => faq_for('de') },
}
event = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000001', 'articles' => [article], 'credit' => { 'name' => 'PRIVATE TEST NAME', 'publish_credit' => false } } }
Dir.mktmpdir do |root|
  files = CurationPublisher.publish(event, root, now: Time.utc(2026, 9, 18))
  check(files.length == 2, 'Expected both language versions')
  identifier = Digest::SHA256.hexdigest(CurationPublisher.key(article['source_url']))[0, 24]
  files.each do |name|
    content = File.read(File.join(root, '_posts', name))
    check(!content.include?('PRIVATE TEST NAME'), 'Private credit leaked')
    check(content.include?('translation_url:'), 'Missing alternate language')
    check(content.include?('source_url:'), 'Missing original source')
    check(content.include?("/assets/img/curated/#{identifier}.png"), 'Missing card image path')
    # The URL/filename must be a readable slug from the title, not the bare hash - the hash still
    # backs the image path and curation_id (checked above/below), just not what readers see.
    check(name.include?('coe-ownership-reviews'), "Filename is not a readable slug: #{name}")
    check(!name.include?(identifier), 'Filename must not be the raw hash')
    check(content.match?(%r{permalink: "/[a-z]{2}/posts/coe-ownership-reviews-[0-9a-f]{8}/"}), 'Permalink is not a readable slug')
    front = YAML.safe_load(content.split(/^---\s*$/, 3)[1], permitted_classes: [Date, Time])
    check(front['faq'].is_a?(Array) && front['faq'].length == 3, 'Front matter must carry exactly 3 FAQ items')
    check(front['faq'].all? { |item| item.keys.sort == %w[answer question] }, 'FAQ items must only have question and answer')
    check(front['faq'].map { |item| item['question'] } == FAQ_PAIRS.fetch(front['lang']).map(&:first), 'FAQ questions changed on the way into the front matter')
    check(!content.include?('## FAQ') && !content.include?('Häufige Fragen'), 'FAQ block belongs to the layout, not the Markdown body')
  end
  manifest = JSON.parse(File.read(File.join(root, 'tools', 'pending-cards.json')))
  check(manifest.length == 1 && manifest.first['id'] == identifier && manifest.first['quote'] == article['card_quote'], 'Bad pending-cards.json entry')
  repository = File.expand_path('..', __dir__)
  FileUtils.cp_r(File.join(repository, '_includes'), root)
  FileUtils.cp_r(File.join(repository, '_layouts'), root)
  FileUtils.mkdir_p(File.join(root, '_data'))
  FileUtils.cp(File.join(repository, '_data', 'authors.yml'), File.join(root, '_data'))
  FileUtils.cp_r(File.join(repository, '_data', 'locales'), File.join(root, '_data'))
  configuration = Jekyll.configuration('config' => File.join(repository, '_config.yml'), 'source' => root, 'destination' => File.join(root, '_site'), 'quiet' => true)
  Jekyll::Site.new(configuration).process
  %w[en de].each do |locale|
    rendered = Dir.glob(File.join(root, '_site', locale, 'posts', '*', 'index.html')).first
    check(!rendered.nil?, "Missing rendered #{locale} page")
    document = Nokogiri::HTML5(File.read(rendered))
    check(document.css('head link[rel="alternate"][hreflang]').map { |link| link['hreflang'] }.sort == %w[de en x-default], 'Missing reciprocal hreflang')
    check(document.at_css('a.original-link')['href'] == article['source_url'], 'Original link changed')
    check(document.css('.contributor-credit').empty?, 'Unapproved contributor rendered')
    check(document.css('.curated-attribution a[href=""]').empty?, 'Empty author link')
    check(document.at_css('html')['lang'] == locale, 'Incorrect document language')
    check(document.css('li').length >= 2, 'Takeaway did not render as a bulleted list')
    blocks = document.css('section.post-faq')
    check(blocks.length == 1, 'Expected exactly one visible FAQ block')
    questions = blocks.first.css('h3').map { |node| node.text.strip }
    answers = blocks.first.css('p').map { |node| node.text.strip }
    check(questions.length == 3 && answers.length == 3, 'Expected 3 visible questions and 3 answers')
    check(blocks.first.css('h2').map { |node| node.text.strip } == [locale == 'de' ? 'Häufige Fragen' : 'Frequently asked questions'], 'Wrong FAQ heading')
    faq_documents = document.css('script[type="application/ld+json"]').map { |node| JSON.parse(node.text) }.select { |data| data['@type'] == 'FAQPage' }
    check(faq_documents.length == 1, 'Expected exactly one FAQPage block')
    entities = faq_documents.first['mainEntity']
    check(faq_documents.first['inLanguage'] == locale, 'FAQPage language differs from the page language')
    check(entities.length == 3, 'FAQPage must carry exactly 3 questions')
    check(entities.map { |entity| entity['name'] } == questions, 'FAQPage questions differ from the visible questions')
    check(entities.map { |entity| entity['acceptedAnswer']['text'] } == answers, 'FAQPage answers differ from the visible answers')
    check(questions == FAQ_PAIRS.fetch(locale).map(&:first), 'Visible questions differ from the payload')
  end
  check(CurationPublisher.publish(event, root).empty?, 'Repeated URL published twice')
  article['source_url'] = article['source_url'].sub('www.', '').sub(%r{/$}, '') + '?utm_source=test'
  check(CurationPublisher.publish(event, root).empty?, 'Tracking URL was not deduplicated')
end

Dir.mktmpdir do |root|
  broken = article.merge('source_url' => 'https://www.powerplatformtip.com/article/broken-one/', 'en' => article['en'].merge('takeaway' => 'No bullet prefix, this one is malformed.'))
  good = article.merge('source_url' => 'https://www.powerplatformtip.com/article/good-one/')
  batch_event = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000002', 'articles' => [broken, good], 'credit' => {} } }
  files = CurationPublisher.publish(batch_event, root, now: Time.utc(2026, 9, 18))
  check(files.length == 2, 'One malformed article in a batch must not block the rest')
end

Dir.mktmpdir do |root|
  video = article.merge('source_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'source_type' => 'youtube', 'source_video_id' => 'dQw4w9WgXcQ')
  event = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000003', 'articles' => [video], 'credit' => {} } }
  files = CurationPublisher.publish(event, root, now: Time.utc(2026, 9, 18))
  check(files.length == 2, 'Expected both language versions for a video source')
  files.each do |name|
    content = File.read(File.join(root, '_posts', name))
    check(content.include?('source_type: youtube'), 'Missing source_type in front matter')
    check(content.include?('source_video_id: dQw4w9WgXcQ'), 'Missing source_video_id in front matter')
    check(content.include?('{% include source-video-embed.html %}'), 'Missing video embed include')
  end
  repository = File.expand_path('..', __dir__)
  FileUtils.cp_r(File.join(repository, '_includes'), root)
  FileUtils.mkdir_p(File.join(root, '_data'))
  FileUtils.cp(File.join(repository, '_data', 'authors.yml'), File.join(root, '_data'))
  FileUtils.cp_r(File.join(repository, '_data', 'locales'), File.join(root, '_data'))
  configuration = Jekyll.configuration('config' => File.join(repository, '_config.yml'), 'source' => root, 'destination' => File.join(root, '_site'), 'quiet' => true)
  Jekyll::Site.new(configuration).process
  rendered = Dir.glob(File.join(root, '_site', 'en', 'posts', '*', 'index.html')).first
  document = Nokogiri::HTML5(File.read(rendered))
  iframe = document.at_css('.source-video-embed iframe')
  check(!iframe.nil?, 'Video iframe did not render')
  check(iframe['src'] == 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', 'Wrong or non-privacy-enhanced embed URL')
  check(iframe['loading'] == 'lazy', 'Video iframe must lazy-load')
  check(!iframe['title'].to_s.strip.empty?, 'Video iframe missing accessible title')
end
rejects { CurationPublisher.render(article.merge('source_type' => 'podcast-episode'), {}, NOW) }
rejects { CurationPublisher.render(article.merge('source_url' => 'https://www.youtube.com/watch?v=short', 'source_type' => 'youtube', 'source_video_id' => 'short'), {}, NOW) }
Dir.mktmpdir do |root|
  no_video_id = article.merge('source_url' => 'https://www.youtube.com/watch?v=missingid', 'source_type' => 'youtube')
  event = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000004', 'articles' => [no_video_id], 'credit' => {} } }
  check(CurationPublisher.publish(event, root, now: Time.utc(2026, 9, 18)).empty?, 'YouTube source without a video ID must be skipped, not published')
end
rejects { CurationPublisher.url('http://127.0.0.1/') }
rejects { CurationPublisher.url('https://localhost/') }
rejects { CurationPublisher.url('https://user:password@powerplatformtip.com/') }
rejects { CurationPublisher.credit({ 'publish_credit' => true, 'linkedin' => 'https://linkedin.com.evil.org/in/person' }) }
rejects { CurationPublisher.render(article.merge('tags' => ['invented-tag']), {}, NOW) }
rejects { CurationPublisher.render(article.merge('en' => article['en'].merge('tldr' => 'x' * 601)), {}, NOW) }
rejects { CurationPublisher.render(article.merge('en' => article['en'].merge('takeaway' => 'No bullet prefix on this line.')), {}, NOW) }
rejects { CurationPublisher.render(article.merge('en' => article['en'].merge('takeaway' => (1..5).map { |n| "- Group #{n}: too many lines." }.join("\n"))), {}, NOW) }
rejects { CurationPublisher.render(article.merge('card_quote' => 'Smart “quotes” break the renderer'), {}, NOW) }
rejects { CurationPublisher.render(article.merge('card_topic' => 'A topic label that is much too long for a chip'), {}, NOW) }
def with_faq(source, locale, faq)
  source.merge(locale => source[locale].merge('faq' => faq))
end

good_en = faq_for('en')
check(CurationPublisher.faq_items(good_en).length == 3, 'Valid FAQ rejected')
check(CurationPublisher.faq_items(replace_first(good_en, 'answer' => words(10))).length == 3, '10-word answer must be accepted')
check(CurationPublisher.faq_items(replace_first(good_en, 'answer' => words(35))).length == 3, '35-word answer must be accepted')
rejects { CurationPublisher.render(with_faq(article, 'en', good_en.first(2)), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', good_en + [{ 'question' => 'Is a fourth question allowed here at all?', 'answer' => words(20) }]), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'de', good_en.first(2)), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'answer' => words(9))), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'answer' => words(36))), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'answer' => Array.new(70, 'abcdefghijkl').join(' '))), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'question' => 'Is this question without a question mark')), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'question' => 'Short one now?')), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'question' => "#{'Very long question ' * 8}?")), {}, NOW) }
rejects { CurationPublisher.render(with_faq(article, 'en', replace_first(good_en, 'answer' => "#{words(20)} <b>bold</b>")), {}, NOW) }
%w[< > { } ` * _ [ ] #].each do |character|
  rejects { CurationPublisher.faq_items(replace_first(good_en, 'answer' => "#{words(20)} #{character}")) }
  rejects { CurationPublisher.faq_items(replace_first(good_en, 'question' => "Does the character #{character} belong in a question?")) }
end
rejects { CurationPublisher.faq_items(replace_first(good_en, 'answer' => "#{words(15)}\n#{words(15)}")) }
rejects { CurationPublisher.faq_items(good_en.each_with_index.map { |item, index| index == 1 ? item.merge('question' => good_en[0]['question'].upcase) : item }) }
rejects { CurationPublisher.faq_items(replace_first(good_en, 'note' => 'extra key')) }
rejects { CurationPublisher.faq_items(good_en.map { |item| item.reject { |key, _| key == 'answer' } }) }
rejects { CurationPublisher.faq_items(['not a hash'] * 3) }
rejects { CurationPublisher.faq_items('not a list') }
rejects { CurationPublisher.faq_items(nil) }
rejects { CurationPublisher.render(article.merge('en' => article['en'].reject { |key, _| key == 'faq' }), {}, NOW) }
rejects { CurationPublisher.render(article.merge('de' => article['de'].reject { |key, _| key == 'faq' }), {}, NOW) }
rejects { CurationPublisher.faq_items(good_en, Set.new([CurationPublisher.faq_key(good_en[2]['question'])])) }
check(CurationPublisher.faq_items(good_en, Set.new(['somethingelse'])).length == 3, 'Unrelated known question must not block a FAQ')

# A question that already exists on another post of the same language is not published a second time;
# the same article with distinct questions is.
Dir.mktmpdir do |root|
  run = lambda do |name, articles|
    payload = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-0000000000aa', 'articles' => articles, 'credit' => {} } }
    original = $stderr
    $stderr = StringIO.new
    begin
      [CurationPublisher.publish(payload, root, now: Time.utc(2026, 9, 18)), $stderr.string]
    ensure
      $stderr = original
    end
  end
  first = article.merge('source_url' => 'https://www.powerplatformtip.com/article/faq-first/')
  second = article.merge('source_url' => 'https://www.powerplatformtip.com/article/faq-second/')
  third = with_faq(with_faq(article.merge('source_url' => 'https://www.powerplatformtip.com/article/faq-third/'), 'en', faq_for('en', variant: 'third')), 'de', faq_for('de', variant: 'dritter')).merge('source_url' => 'https://www.powerplatformtip.com/article/faq-third/')
  files, = run.call('first', [first])
  check(files.length == 2, 'First article with FAQ must be published')
  files, warnings = run.call('second', [second])
  check(files.empty?, 'Article repeating the questions of an existing post must be skipped')
  check(warnings.include?('Duplicate FAQ question'), 'Skip reason for repeated questions must be reported')
  files, = run.call('third', [third])
  check(files.length == 2, 'Article with distinct questions must be published')
  files, = run.call('again', [first])
  check(files.empty?, 'Already published article must stay skipped')
end
Dir.mktmpdir do |root|
  one = article.merge('source_url' => 'https://www.powerplatformtip.com/article/faq-batch-one/')
  two = article.merge('source_url' => 'https://www.powerplatformtip.com/article/faq-batch-two/')
  batch = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-0000000000bb', 'articles' => [one, two], 'credit' => {} } }
  original = $stderr
  $stderr = StringIO.new
  begin
    files = CurationPublisher.publish(batch, root, now: Time.utc(2026, 9, 18))
  ensure
    $stderr = original
  end
  check(files.length == 2, 'Two articles in one batch must not share questions')
end
check(CurationPublisher.credit({ 'publish_credit' => 'true', 'name' => 'private' }).nil?, 'String consent accepted')
check(!CurationPublisher.body_text('{% include secret %}<script>[click](https://evil.org)').include?('{%'), 'Liquid injection')
check(!CurationPublisher.body_text('<script>').include?('<script>'), 'HTML injection')
# --- Source age limit (60 days), date consistency, tracking parameters, missing fields ---
def render_at(source_article, now = NOW)
  CurationPublisher.render(source_article, {}, now)
end

def dates(published: nil, updated: nil)
  { 'source_published_at' => published, 'source_updated_at' => updated }
end

def capture_stderr
  captured = StringIO.new
  original = $stderr
  $stderr = captured
  begin
    yield
  ensure
    $stderr = original
  end
  captured.string
end

check(render_at(article.merge(dates(published: '2026-07-21'))).fetch('files').length == 2, 'Source 59 days old must be accepted')
rejects { render_at(article.merge(dates(published: '2026-07-20'))) }
rejects { render_at(article.merge(dates(published: '2026-07-18'))) }
rejects { render_at(article.merge(dates(published: '2023-05-30'))) }
check(render_at(article.merge(dates(published: '2025-01-01', updated: '2026-09-10'))).fetch('files').length == 2, 'A recently updated source must count as current')
rejects { render_at(article.merge(dates(published: '2025-01-01', updated: '2026-01-01'))) }
check(render_at(article.merge(dates(published: nil, updated: nil))).fetch('files').length == 2, 'Without any source date the age cannot be judged')
check(render_at(article.merge(dates(updated: '2026-09-10'))).fetch('files').length == 2, 'Only an updated date: fresh source accepted')
rejects { render_at(article.merge(dates(updated: '2026-01-10'))) }
age_error = begin
  render_at(article.merge(dates(published: '2026-01-10')))
rescue ArgumentError => e
  e.message
end
check(age_error.to_s.include?('days old'), "Age error must name the reason: #{age_error.inspect}")
check(CurationPublisher::MAX_SOURCE_AGE_DAYS == 60, 'Age limit must be 60 days')

# updated >= published
rejects { render_at(article.merge(dates(published: '2026-09-10', updated: '2026-09-09'))) }
check(render_at(article.merge(dates(published: '2026-09-10', updated: '2026-09-10'))).fetch('files').length == 2, 'Equal dates must be accepted')
check(render_at(article.merge(dates(published: '2026-09-10', updated: '2026-09-12'))).fetch('files').length == 2, 'Updated after published must be accepted')
rejects { render_at(article.merge(dates(published: '2026-09-30'))) }
rejects { render_at(article.merge(dates(published: '2026-02-30'))) }
update_error = begin
  render_at(article.merge(dates(published: '2026-09-10', updated: '2026-09-09')))
rescue ArgumentError => e
  e.message
end
check(update_error.to_s.include?('before published'), "Date order error must name the reason: #{update_error.inspect}")

# utm_* and other tracking parameters are removed from the link readers see; real parameters stay
tracked = article.merge('source_url' => 'https://example.org/post?id=7&utm_source=newsletter&utm_medium=email&UTM_Campaign=x&fbclid=abc&gclid=1&msclkid=2#top')
render_at(tracked).fetch('files').each do |_, content|
  front = YAML.safe_load(content.split(/^---\s*$/, 3)[1], permitted_classes: [Date, Time])
  check(front['source_url'] == 'https://example.org/post?id=7', "Tracking parameters left in source_url: #{front['source_url']}")
  check(!content.match?(/utm_|fbclid|gclid|msclkid/i), 'Tracking parameter text left in the post')
end
check(CurationPublisher.clean_url('https://example.org/a?utm_source=x') == 'https://example.org/a', 'Query must disappear when only tracking remains')
check(CurationPublisher.clean_url('https://example.org/a?b=1&c=2') == 'https://example.org/a?b=1&c=2', 'Real parameters must stay unchanged')
check(render_at(tracked).fetch('card')['id'] == render_at(tracked.merge('source_url' => 'https://example.org/post?id=7')).fetch('card')['id'], 'Identifier must not depend on tracking parameters')

# Missing fields: one clear message, the rest of the batch continues
Dir.mktmpdir do |root|
  no_en = article.reject { |name, _| name == 'en' }.merge('source_url' => 'https://www.powerplatformtip.com/article/no-en/')
  no_title = article.merge('source_url' => 'https://www.powerplatformtip.com/article/no-title/').tap { |item| item.delete('source_title') }
  stale = article.merge('source_url' => 'https://www.powerplatformtip.com/article/stale/', 'source_published_at' => '2025-01-01')
  good = article.merge('source_url' => 'https://www.powerplatformtip.com/article/fine/')
  batch = { 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000005', 'articles' => [no_en, no_title, stale, good], 'credit' => {} } }
  files = nil
  messages = capture_stderr { files = CurationPublisher.publish(batch, root, now: NOW) }
  check(files.length == 2, 'Only the valid article may be published')
  check(messages.include?('Missing required field: en'), "Missing en must be reported clearly: #{messages}")
  check(messages.include?('no-en') && messages.include?('stale'), 'Skip messages must name the article')
  check(messages.include?('days old'), 'Stale article must be reported with its age')
end

# A KeyError raised deep inside (for example a missing payload field) is reported, not fatal
Dir.mktmpdir do |root|
  broken = article.merge('source_url' => 'https://www.powerplatformtip.com/article/key-error/')
  singleton = class << CurationPublisher; self; end
  singleton.send(:alias_method, :real_card, :card)
  singleton.send(:define_method, :card) { |_data, _id| { 'x' => 1 }.fetch('missing') }
  captured = StringIO.new
  original = $stderr
  $stderr = captured
  files = nil
  begin
    files = CurationPublisher.publish({ 'action' => 'curated-publication', 'client_payload' => { 'request_id' => '00000000-0000-4000-8000-000000000006', 'articles' => [broken], 'credit' => {} } }, root, now: NOW)
  ensure
    $stderr = original
    singleton.send(:alias_method, :card, :real_card)
  end
  check(files.empty?, 'KeyError article must be skipped')
  check(captured.string.include?('missing required field "missing"'), "KeyError must be reported clearly: #{captured.string}")
end

# Layout: source line before the TL;DR, with title and date; notice only from 60 days on
Dir.mktmpdir do |root|
  today = Date.today
  fresh = article.merge('source_url' => 'https://www.powerplatformtip.com/article/fresh-one/', 'source_title' => 'Fresh original title', 'source_published_at' => (today - 3).iso8601)
  old_post = article.merge('source_url' => 'https://www.powerplatformtip.com/article/old-one/', 'source_title' => 'Old original title', 'source_published_at' => '2026-01-10')
  FileUtils.mkdir_p(File.join(root, '_posts'))
  fresh_files = CurationPublisher.render(fresh, {}, Time.now).fetch('files')
  old_files = CurationPublisher.render(old_post, {}, Time.utc(2026, 1, 20)).fetch('files')
  (fresh_files + old_files).each { |name, content| File.write(File.join(root, '_posts', name), content, encoding: 'UTF-8') }
  repository = File.expand_path('..', __dir__)
  FileUtils.cp_r(File.join(repository, '_includes'), root)
  FileUtils.cp_r(File.join(repository, '_layouts'), root)
  FileUtils.mkdir_p(File.join(root, '_data'))
  FileUtils.cp(File.join(repository, '_data', 'authors.yml'), File.join(root, '_data'))
  FileUtils.cp_r(File.join(repository, '_data', 'locales'), File.join(root, '_data'))
  configuration = Jekyll.configuration('config' => File.join(repository, '_config.yml'), 'source' => root, 'destination' => File.join(root, '_site'), 'quiet' => true)
  Jekyll::Site.new(configuration).process
  pages = Dir.glob(File.join(root, '_site', '*', 'posts', '*', 'index.html'))
  check(pages.length == 4, "Expected 4 rendered pages, got #{pages.length}")
  pages.each do |path|
    html = File.read(path)
    document = Nokogiri::HTML5(html)
    locale = document.at_css('html')['lang']
    old = html.include?('Old original title')
    attribution = document.css('.curated-attribution')
    check(attribution.length == 1, "Source line must appear exactly once: #{path}")
    check(html.index('curated-attribution') < html.index('TL;DR'), 'Source line is not above the TL;DR in the HTML')
    text = attribution.first.text.gsub(/\s+/, ' ')
    expected_date = old ? '10.01.2026' : (today - 3).strftime('%d.%m.%Y')
    expected = locale == 'de' ? "Originalartikel vom #{expected_date}" : "Original article from #{expected_date}"
    check(text.include?(expected), "Missing '#{expected}' in: #{text}")
    check(text.include?(old ? 'Old original title' : 'Fresh original title'), 'Original title missing from the source line')
    outdated = document.at_css('.source-outdated')
    check(old == !outdated.nil?, "Outdated notice wrong (old=#{old}): #{path}")
    if old
      check(outdated.text.include?(locale == 'de' ? 'Stand der Quelle kann überholt sein' : 'Source may be outdated'), "Wrong outdated wording: #{outdated.text}")
    end
  end
end

puts 'Publisher checks passed: rendered languages and hreflang, attribution, URL deduplication, consent, limits, escaping and FAQ rules.'