const json = require('./notes.json');

json
  .forEach(record => {
    console.log(`## Section - ${record.Section}
### Lecture - ${record.LectureTitle}`);
    console.log(`<pre>
     ${record.content}
</pre>`);
  })

/** 1. Run in Browser
 *          data = [];
 *          i = 0;
 *          document.querySelectorAll('div[class="item-link item-link--common--RP3fp lecture-bookmark-v2--intro--132ek"]').forEach((e) => {
 *                  if (!e.innerText.includes(':')) {
 *                      if (data[i]) {
 *                          data[i] = {...data[i], Section: e.innerText}
 *                  } else {
 *                          data[i] = { Section: e.innerText }
 *                  }
 *                  i++;
 *              }
 *          })
 *          document.querySelectorAll('div[class="lecture-bookmark-v2--sub-intro--2OzKK"]').forEach((e,i) => {
 *                  if (data[i]) {
 *                      data[i] = {...data[i], LectureTitle: e.innerText}
 *              } else {
 *                      data[i] = { LectureTitle: e.innerText }
 *              }
 *          })
 *          document.querySelectorAll('div[class="lecture-bookmark-v2--content--wi4tQ"]').forEach((e,i) => {
 *                  if (data[i]) {
 *                      data[i] = {...data[i], content: e.innerHTML}
 *              } else {
 *                      data[i] = { content: e.innerHTML }
 *              }
 *          });
 *          console.log(JSON.stringify(data, null, ' '));
 *  2. Save it to notes.json
 *  3. Run
 *          node parse.js > NOTES.md
 *  4. Done
 */