---
layout: article
titles:
  # @start locale config
  en      : &EN      Github LaTeX formulas rendering
  en-GB   : *EN
  en-US   : *EN
  en-CA   : *EN
  en-AU   : *EN
  zh-Hans : &ZH_HANS  Github LaTeX公式渲染
  zh      : *ZH_HANS
  zh-CN   : *ZH_HANS
  zh-SG   : *ZH_HANS
  zh-Hant : *ZH_HANS
  zh-TW   : *ZH_HANT
  zh-HK   : *ZH_HANT
  ko      : *ZH_HANT
  ko-KR   : *ZH_HANT
  fr      : *ZH_HANT
  fr-BE   : *ZH_HANT
  fr-CA   : *ZH_HANT
  fr-CH   : *ZH_HANT
  fr-FR   : *ZH_HANT
  fr-LU   : *ZH_HANT
  # @end locale config
key: page-about
show_title: false
---

## Here

<script>
        function toGithubRenderURL() {
            var input = document.getElementsByName('input')[0].value;
            var output = '<img src="https://render.githubusercontent.com/render/math?math=' + encodeURIComponent(input) + '">';
            document.getElementsByName('output')[0].value = output;
            document.getElementById('result').innerHTML = output;
        }
        function copyToClipboard() {
            const input = document.getElementsByName('output')[0];
            input.select();
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                alert('Copy Sucess');
            }
        }
</script>
<style type="text/css">
    input {
        width: 95%;
    }
    .article__content img {
        box-shadow: none;
        border-radius: unset;
    }
    .button
</style>


<label for="input">Latex equation: </label>
<br><textarea rows="10" cols="50" name="input"></textarea>
<br><br>
<button  class="button button--secondary button--pill" onClick="toGithubRenderURL()">Encode to github render URL</button>
<br><br>
<label for="output">The URL is: </label>
<input type="url" name="output">
<br><br>
<button  class="button button--secondary button--pill" onClick="copyToClipboard()">Copy to Clipboard</button>
<br><br>
<label for="result">The result is: </label>

<p id="result"></p>