import {diff_match_patch as DiffMatchPatch} from 'diff-match-patch';
import {expose} from 'comlink';

const dmp = new DiffMatchPatch();

/**
 * diffを計算して、HTMLテキストを返す
 * @param {string} oldText
 * @param {string} newText
 * @returns {string}
 */
function computeDiff(oldText, newText) {
    const diff = dmp.diff_main(oldText, newText);

    dmp.diff_cleanupSemantic(diff);
    return dmp.diff_prettyHtml(diff).replaceAll('&para;', '').replaceAll('<br>', '\n');
}

expose(computeDiff);
