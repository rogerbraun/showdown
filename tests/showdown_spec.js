var showdown = require("../src/showdown.js");

// Some helpers
var assert_equal = function(a, b) {
  if(a != b){
    return { message: ("Expected:\n" + a + "\nGot:\n" + b + "\n"), result: false};
  } else { 
    return {result: true};
  }
}

var it = function(name, code) {  
  var res = code();
  if(res.result){
    console.log("Passed: " + name );
    return true;
  } else {
    console.log("Failed: " + name + "\n");
    console.log(res.message);
    return false;
  }
}

// Setup

var converter = new showdown.Showdown.converter();

// The tests

it("should make paragraphs out of simple texts", function() {
  var html = converter.makeHtml("Hallo");
  var expected = "<p>Hallo</p>"
  return assert_equal(html, expected);
});

it("should parse Github-style code blocks", function() {
  var text = "```ruby\ndef hello_world\n  puts 'Hallo'\nend\n```";
  var html = converter.makeHtml(text);
  var expected = "<pre><code class='ruby'>def hello_world\n  puts 'Hallo'\nend\n</code></pre>";
  return assert_equal(html, expected);
});

