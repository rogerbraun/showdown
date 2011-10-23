var showdown = require("../src/showdown.js");

// Some helpers
var assert_equal = function(a, b) {
  if(a != b){
    throw { message: ("Expected:\n\"" + a + "\"\nGot:\n\"" + b + "\""), result: false};
  } else { 
    return {result: true};
  }
}

var indent = function(text) {
  return "  " + text.replace(/\n/g, "\n  ");
}

var it = function(name, code) {  
  var res = {result: true}
  try {
    code();
  } catch(er) {
    res = er;
  }

  if(res.result){
    console.log("\033[1;32mPassed: " + name + "\033[0m");
    return true;
  } else {
    console.log("\033[1;31mFailed: " + name + "\n\033[0m");
    console.log(indent(res.message));
    return false;
  }
}

// Setup

var converter = new showdown.Showdown.converter();

// The tests

it("should make paragraphs out of simple texts", function() {
  var text = "Hallo";
  var html = converter.makeHtml(text);
  var expected = "<p>Hallo</p>"
  assert_equal(html, expected);

  text = "Hello\n\nHow are you?";
  html = converter.makeHtml(text);
  expected = "<p>Hello</p>\n\n<p>How are you?</p>"
  assert_equal(html, expected);
});

it("should parse Github-style code blocks", function() {
  var text = "```ruby\ndef hello_world\n  puts 'Hallo'\nend\n```";
  var html = converter.makeHtml(text);
  var expected = "<pre><code class='ruby'>def hello_world\n  puts 'Hallo'\nend\n</code></pre>";
  assert_equal(html, expected);
});

it("should make header tags", function() {
  var text = "# Header";
  var html = converter.makeHtml(text);
  var expected = "<h1 id=\"header\">Header</h1>";
  assert_equal(html, expected);

  text = "## Header";
  html = converter.makeHtml(text);
  expected = "<h2 id=\"header\">Header</h2>";
  assert_equal(html, expected);
});

it("should make header tags from underlined text", function() {
  var text = "Header\n======";
  var html = converter.makeHtml(text);
  var expected = "<h1 id=\"header\">Header</h1>";
  assert_equal(html, expected);
});

it("should make second level header tags from text underlined with underscores", function() {
  var text = "Header\n------";
  var html = converter.makeHtml(text);
  var expected = "<h2 id=\"header\">Header</h2>";

  assert_equal(html, expected);
});

it("should do bulleted lists", function() {
  var text = "* Write a JS Markdown interpreter\n* ????\n* Profit!!";
  var html = converter.makeHtml(text);
  var expected = "<ul>\n<li>Write a JS Markdown interpreter</li>\n<li>????</li>\n<li>Profit!!</li>\n</ul>";

  assert_equal(html, expected);
});

it("should do numbered lists", function() {
  var text = "1. Write a JS Markdown interpreter\n2. ????\n3. Profit!!";
  var html = converter.makeHtml(text);
  var expected = "<ol>\n<li>Write a JS Markdown interpreter</li>\n<li>????</li>\n<li>Profit!!</li>\n</ol>";

  assert_equal(html, expected);
});

