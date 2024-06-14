create table products
(
    id          uuid default uuid_generate_v4() not null
        constraint "PK_0806c755e0aca124e67c0cf6d7d"
            primary key,
    name        varchar                         not null,
    price       numeric                         not null,
    description varchar                         not null,
    stock       integer                         not null,
    category    products_category_enum          not null,
    image_url   varchar                         not null,
    active      boolean                         not null,
    price_id    varchar
);

alter table products
    owner to postgres;

INSERT INTO public.products (id, name, price, description, stock, category, image_url, active, price_id) VALUES ('d3b4a5d3-56d1-4562-9f12-1c3e9efc11e9', 'Aceite Esencial de Lavanda', 13, 'Aceite esencial de lavanda para relajación y aromaterapia.', 150, 'Beauty', 'https://www.esturirafi.com/tienda/wp-content/uploads/2023/11/aceite-esencial-lavanda-1.jpg', true, null);
INSERT INTO public.products (id, name, price, description, stock, category, image_url, active, price_id) VALUES ('215dea0b-322d-4865-8586-4ccf2ce833cb', 'Vela aromática', 35, 'Vela aromática para fomentar la concentración', 122, 'Beauty', 'https://dojiw2m9tvv09.cloudfront.net/87369/product/F_553245.jpeg?76&time=1715999269', true, 'price_1PQXmZRuabq7cWhgvPInK1wA');
INSERT INTO public.products (id, name, price, description, stock, category, image_url, active, price_id) VALUES ('b5fe1eb6-e993-4455-8734-50f9123e0b5f', 'Champú acondicionador', 13, 'Champú', 431, 'Beauty', 'https://www.beautycoiffure.com/229756-listing_and_product_page/wellplex-wellness-fuerza-acondicionador-reparador-1l.jpg', true, 'price_1PQXm4Ruabq7cWhgsMgsw7jX');
