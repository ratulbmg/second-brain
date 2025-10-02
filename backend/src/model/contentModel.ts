export interface ContentRegisterRequest {
    uniqueId: string;
    title: string;
    content: string;
    url: string;
    tagId: number;
    linkId?: string;
}

export interface ContentResponse {
    uniqueId: string;
    title: string;
    content: string;
    url: string;
    tag: string;
    link?: string;
}