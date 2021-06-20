import {diff_match_patch as DiffMatchPatch} from 'diff-match-patch';
import {diffArrays} from 'diff';
import {expose} from 'comlink';

const dmp = new DiffMatchPatch();

/**
 * jsdiffでdiffを計算して、配列で結果を返す
 * @param {string} oldText
 * @param {string} newText
 * @returns {[]}
 */
function computeDiffWithJsDiff(oldText, newText) {
    const oldFileLines = oldText.split(/\r|\n|\r\n/);
    const newFileLines = newText.split(/\r|\n|\r\n/);

    return diffArrays(oldFileLines, newFileLines);
}

/**
 * diffMatchPatchでdiffを計算して、HTMLテキストを返す
 * @param {string} oldText
 * @param {string} newText
 * @returns {string}
 */
function computeDiffWithDiffMatchPatch(oldText, newText) {
    const diff = dmp.diff_main(oldText, newText);

    dmp.diff_cleanupSemantic(diff);
    return dmp.diff_prettyHtml(diff).replaceAll('&para;', '').replaceAll('<br>', '\n');
}

expose({
    computeDiffWithJsDiff,
    computeDiffWithDiffMatchPatch,
});
