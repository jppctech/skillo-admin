import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetContacts = () => {
    const query = useQuery({
        queryKey: ["contacts"],
        queryFn: async () => {
            const response = await client.api.$get()

            if (!response.ok) {
                throw new Error("Failed to fetch contacts")
            }

            const { data } = await response.json();
            return data;
        },
    });

    return query;
};