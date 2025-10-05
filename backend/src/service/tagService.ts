import { TagResponse } from "../model/tagModel";
import { repositoryWrapper } from "../repository/repositoryWrapper";

class TagService {
    constructor(userData: void) {
        // this.userData = userData;
    }

    async getAllTags(req: void): Promise<TagResponse[]> {
        const tags = await repositoryWrapper.tagRepository.findAll();
        return tags;
    }

}
export default TagService;