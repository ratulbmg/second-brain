export interface ContentRegisterRequest {
    uniqueId: string;
    title: string;
    content: string;
    url: string;
    tagId: number;
    linkId?: number;
}

export interface ContentResponse {
    id: number;
    uniqueId: string;
    title: string;
    content: string;
    url: string;
    userId: number;
    tag: string;
    link?: string;
}

export interface ContentResponseWithRange {
    totalLinks: number;
    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    contents: ContentResponse[];
}