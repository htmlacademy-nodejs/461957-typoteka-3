import {CliAction} from "../../types/cli-action";
import {Article} from "../../types/article";
const {MS_IN_DAY, DAYS_IN_MONTH} = require(`../../utils/time`);
const fs = require(`fs`).promises;
const {getRandomInt, shuffle} = require(`../../utils`);
const {ExitCode} = require(`../../constants`);
const chalk = require(`chalk`);

const DEFAULT_COUNT: number = 1;
const FILE_NAME = `mocks.json`;
const THREE_MONTHS_DURATION = 3 * DAYS_IN_MONTH * MS_IN_DAY;

const CategoriesRestrict = {
  min: 1,
  max: 5,
};

const AnnounceRestrict = {
  min: 1,
  max: 5,
};

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

function getDate(currentDate: number): number {
  return currentDate - 1 - getRandomInt(0, THREE_MONTHS_DURATION);
}

function generateMocks(count: number): Article[] {
  return Array(count).fill(undefined).map(() => ({
    announce: shuffle(SENTENCES).slice(AnnounceRestrict.min, getRandomInt(AnnounceRestrict.min, AnnounceRestrict.max)).join(` `),
    category: shuffle(CATEGORIES).slice(CategoriesRestrict.min, getRandomInt(CategoriesRestrict.min, CategoriesRestrict.max)),
    createdDate: new Date(getDate(Date.now())),
    fullText: shuffle(SENTENCES).slice(0, SENTENCES.length - 1).join(` `),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
  }));
}

const cliAction: CliAction = {
  name: `--generate`,
  async run(args?) {
    const [mockCountInput] = args;
    const mockCount = parseInt(mockCountInput, 10) || DEFAULT_COUNT;
    if (mockCount > 1000) {
      console.error(chalk.red(`Не больше 1000 публикаций, введенное значение: ${mockCount}`));
      process.exit(ExitCode.success);
    }
    const content = JSON.stringify(generateMocks(mockCount), undefined, 2);
    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`${mockCount} article(s) saved to ${FILE_NAME}`));
    } catch (e) {
      console.error(chalk.red(`Fail to write file ${FILE_NAME}`));
      console.error(chalk.red(e));
    }
  }
};

export = cliAction;