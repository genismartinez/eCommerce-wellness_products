create table items
(
    id         uuid default uuid_generate_v4() not null
        constraint "PK_ba5885359424c15ca6b9e79bcf6"
            primary key,
    order_id   uuid
        constraint "FK_f3dcaa16e13ff84a647c6410e15"
            references orders,
    product_id uuid                            not null
        constraint "FK_fb0b5b8bc408db666a8bf407661"
            references products,
    quantity   integer                         not null,
    price      numeric                         not null
);

alter table items
    owner to postgres;

INSERT INTO public.items (id, order_id, product_id, quantity, price) VALUES ('8f822b26-8b33-4265-b924-c90ca543a7db', '167b7fc6-3332-49b1-9c3f-378d894020c3', '215dea0b-322d-4865-8586-4ccf2ce833cb', 1, 35);
INSERT INTO public.items (id, order_id, product_id, quantity, price) VALUES ('705c03af-1f37-4659-98af-9d501e873e53', '167b7fc6-3332-49b1-9c3f-378d894020c3', 'b5fe1eb6-e993-4455-8734-50f9123e0b5f', 1, 13);
