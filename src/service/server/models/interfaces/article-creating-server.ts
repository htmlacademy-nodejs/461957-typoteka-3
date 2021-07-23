import {IAnnounce, ICategoriesIds, ICreatedDate, IFullText, ITitle} from "../../../../types/article";
import {IAuthorId} from "../../../../types/interfaces/author-id";
import {IPictureName} from "../../../../types/interfaces/picture-name";

interface IArticleCreatingServer
  extends ITitle,
    ICreatedDate,
    IAnnounce,
    IFullText,
    ICategoriesIds,
    IAuthorId,
    IPictureName {}

export {IArticleCreatingServer};
