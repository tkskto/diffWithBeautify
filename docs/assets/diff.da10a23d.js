/*!
 * see dependencies.txt to check license of thirdParty libraries.
 */
import{E as t,F as a}from"./vendor.d11bdb79.js";const e=new t.exports.diff_match_patch;a((function(t,a){const n=e.diff_main(t,a);return e.diff_cleanupSemantic(n),e.diff_prettyHtml(n).replaceAll("&para;","").replaceAll("<br>","\n")}));
