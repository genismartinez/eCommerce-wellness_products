create table carts
(
    id      uuid default uuid_generate_v4() not null
        constraint "PK_b5f695a59f5ebb50af3c8160816"
            primary key,
    user_id uuid
        constraint "UQ_2ec1c94a977b940d85a4f498aea"
            unique
        constraint "FK_2ec1c94a977b940d85a4f498aea"
            references users
            on delete cascade,
    total   numeric                         not null
);

alter table carts
    owner to postgres;

