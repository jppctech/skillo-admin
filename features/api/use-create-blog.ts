import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.blog["post-blog"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.blog["post-blog"]["$post"]>["json"]

export const useCreatePostBlog = () => {
    const queryClient = useQueryClient();

    
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.blog["post-blog"].$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Blog posted successfully")
            queryClient.invalidateQueries({ queryKey: ["blog"] });
        },
    });
    return mutation
}