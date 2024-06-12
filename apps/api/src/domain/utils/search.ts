export type StringFilter = string | {
    type: "CONTAINS" | "STARTS_WITH" | "ENDS_WITH" | "EQUALS";
    value: string;
}

export type DateFilter = Date | string | {
    type: "BEFORE" | "AFTER" | "EQUALS";
    value: Date | string;
}

export type ListFilter<T> = {
    type: "IN" | "NOT_IN";
    value: T[];
}

export type SearchInput<T, Option extends { readonly authorizeLogic?: boolean } = { authorizeLogic: true } > = {
    filter?: {
        [Key in keyof T]?: 
            T[Key] extends Date ? DateFilter : 
                T[Key] extends string ? StringFilter : 
                    T[Key] extends Array<infer U> ? ListFilter<U> : never;
    } & Option["authorizeLogic"] extends true ? {
        AND?: SearchInput<T, { authorizeLogic: false }>["filter"][];
        OR?: SearchInput<T, { authorizeLogic: false }>["filter"][];
    } : Record<string, never>,
    skip?: number;
    take?: number;
}

export const searchInputToPrisma = <T>(input: SearchInput<T>): T => {
    if (input.filter === undefined) return {} as T;

    const result = {};
    for (const key in input.filter) {
        const filterValue = input.filter[key];
        if (key === "AND" || key === "OR") {
            result[key as string] = (filterValue as SearchInput<T>[]).map(searchInputToPrisma);
            continue;
        }
        if (typeof filterValue === "string" || typeof filterValue === "number") {
            result[key as string] = filterValue;
            continue;
        }
        if (typeof filterValue === "object") {
            if ("type" in filterValue && "value" in filterValue) {
                switch (filterValue.type) {
                    case "CONTAINS":
                        result[key as string] = { contains: filterValue.value };
                        break;
                    case "STARTS_WITH":
                        result[key as string] = { startsWith: filterValue.value };
                        break;
                    case "ENDS_WITH":
                        result[key as string] = { endsWith: filterValue.value };
                        break;
                    case "EQUALS":
                        result[key as string] = { equals: filterValue.value };
                        break;
                    case "BEFORE":
                        result[key as string] = { lt: filterValue.value };
                        break;
                    case "AFTER":
                        result[key as string] = { gt: filterValue.value };
                        break;
                    case "IN":
                        result[key as string] = { hasEvery: filterValue.value };
                        break;
                    case "NOT_IN":
                        result["NOT"] = { [key]: { hasEvery: filterValue.value } };
                        break;
                }
            }
        }
    }
    
    return result as T;
}
    