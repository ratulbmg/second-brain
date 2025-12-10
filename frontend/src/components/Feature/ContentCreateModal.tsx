import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Button, LoadingSpinner, Select, Modal } from "../index"; // Added Modal
import { cn, handleApiError } from "../../utils";
import { useGetTagsQuery } from "../../redux/api/tagsApi";
import { useCreateContentMutation } from "../../redux/api/contentApi";

interface ContentCreateProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

type FormData = {
    title: string;
    content: string;
    url: string;
    tagId: string;
};

const ContentCreateModal: React.FC<ContentCreateProps> = ({ isOpen, onClose, onSuccess }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [createContentError, setCreateContentError] = useState<string | null>(null);
    const { data, isLoading: tagsLoading } = useGetTagsQuery();
    const [createContent, { isLoading }] = useCreateContentMutation();
    const tags = data?.data || [];

    const getAllErrors = (): string | null => {
        const validationErrors: string[] = [];
        if (errors.title?.message) { validationErrors.push(errors.title.message); }
        if (errors.content?.message) { validationErrors.push(errors.content.message); }
        if (errors.url?.message) { validationErrors.push(errors.url.message); }
        if (errors.tagId?.message) { validationErrors.push(errors.tagId.message); }
        if (createContentError) { validationErrors.push(createContentError); }
        return validationErrors.length > 0 ? validationErrors.join('. ') : null;
    };

    const onSubmit = async (data: FormData) => {
        setCreateContentError(null);
        try {
            await createContent({
                uniqueId: crypto.randomUUID(),
                title: data.title,
                content: data.content,
                url: data.url,
                tagId: Number(data.tagId),
            }).unwrap();
            onSuccess?.();
            onClose(); // Close modal on success
        }
        catch (error: unknown) {
            const apiError = handleApiError(error, 'Failed to create content');
            setCreateContentError(apiError.data.errors ? `${apiError.data.message}: ${apiError.data.errors}` : apiError.data.message);
        }
        finally {
            reset();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={() => { }}
        >
            <div className={cn('w-[350px] sm:w-[400px] bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col')}>

                <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Add New Content</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Save your favorite links and ideas.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">

                    <div className="space-y-4">
                        <div className="space-y-1">
                            <Input
                                label="TITLE"
                                placeholder="e.g., React Hooks Guide"
                                variant="ContentCreateInput"
                                {...register('title', { required: 'Title is required' })}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                label="CONTENT / DESCRIPTION"
                                placeholder="e.g., A comprehensive guide to hooks..."
                                variant="ContentCreateInput"
                                {...register('content', { required: 'Content is required' })}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                label="URL"
                                placeholder="https://example.com"
                                variant="ContentCreateInput"
                                {...register('url', { required: 'URL is required' })}
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="relative">
                                <Select
                                    label="TYPE"
                                    options={tags}
                                    variant="ContentCreateSelect"
                                    {...register('tagId', { required: 'Tag is required' })}
                                />
                            </div>
                        </div>
                    </div>

                    {getAllErrors() && (
                        <p className={cn('text-text-denger text-sm')}>
                            {getAllErrors()}
                        </p>
                    )}

                    <div className="pt-2 flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            className="flex-1 bg-black text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="LoginButton"
                            disabled={isLoading || tagsLoading}
                            className="flex-1"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <LoadingSpinner size="sm" />
                                    Adding...
                                </span>
                            ) : 'Create Content'}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default ContentCreateModal;