create table orders
(
    id          uuid                     default uuid_generate_v4() not null
        constraint "PK_710e2d4957aa5878dfe94e4ac2f"
            primary key,
    user_id     uuid
        constraint "FK_a922b820eeef29ac1c6800e826a"
            references users,
    total       numeric                                             not null,
    status      orders_status_enum                                  not null,
    "createdAt" timestamp with time zone default now()              not null
);

alter table orders
    owner to postgres;

INSERT INTO public.orders (id, user_id, total, status, "createdAt") VALUES ('167b7fc6-3332-49b1-9c3f-378d894020c3', '78d6798b-3138-4afd-8909-25f0a64d803b', 48, 'finished', '2024-06-12 16:56:33.698411 +00:00');
