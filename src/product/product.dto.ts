export interface CreateProductDTO {
    
    title: string,
    description : string,
    image : string,
    price : number
}

export type updateProductDTO = Partial<CreateProductDTO>;