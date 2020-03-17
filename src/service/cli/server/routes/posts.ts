const fs = require(`fs`).promises;
const {Router} = require(`express`);
const {MOCK_FILE_PATH} = require(`../../../../constants`);

const postsRouter = new Router();

postsRouter.get(`/`, async (req, res) => {
  let postsContent;
  try {
    const rawContent = await fs.readFile(MOCK_FILE_PATH);
    postsContent = JSON.parse(rawContent);
  } catch (e) {
    postsContent = [];
  }
  res.json(postsContent);
});

export = postsRouter;
