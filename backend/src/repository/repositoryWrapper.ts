import { ContentRepository } from './contentRepository'
import { LinkRepository } from './linkRepository'
import { TagRepository } from './tagRepository'
import { UserRepository } from './userRepository'

class RepositoryWrapper {
  userRepository: UserRepository
  contentRepository: ContentRepository
  tagRepository: TagRepository
  linkRepository: LinkRepository
  // Add other repositories here

  constructor() {
    this.userRepository = new UserRepository()
    this.contentRepository = new ContentRepository()
    this.tagRepository = new TagRepository()
    this.linkRepository = new LinkRepository()
    // Initialize other repositories here
  }
}

export const repositoryWrapper = new RepositoryWrapper()
