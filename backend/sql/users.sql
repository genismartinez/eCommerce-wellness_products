create table users
(
    id       uuid default uuid_generate_v4() not null
        constraint "PK_a3ffb1c0c8416b9fc6f907b7433"
            primary key,
    username varchar                         not null
        constraint "UQ_fe0bb3f6520ee0469504521e710"
            unique,
    email    varchar                         not null
        constraint "UQ_97672ac88f789774dd47f7c8be3"
            unique,
    password varchar                         not null
);

alter table users
    owner to postgres;

INSERT INTO public.users (id, username, email, password) VALUES ('78d6798b-3138-4afd-8909-25f0a64d803b', 'genis', 'genis@genis.com', '$2a$08$cGesd5Cvya7Y1evg7i4tX.FNY9gy2CUBIFs5MYcRgVPt1/4FK6.qy');
INSERT INTO public.users (id, username, email, password) VALUES ('558e87f0-9810-47c1-8e9f-907f20f649e2', 'miguel', 'miguel@miguel.com', '$2a$08$F8P/g7HSbbflmdmMEMZuGOyoSsnqf4xxi3vIvJjEirqVWQJABSy1C');
INSERT INTO public.users (id, username, email, password) VALUES ('26370ece-9814-453f-8661-ee5d3abad674', 'testuser', 'testuser@example.com', '$2a$08$gEyuS6U3ETwgpyiYruW1zucPN8wVtDhGnkOjauiogqvR.IsfNcHYO');
