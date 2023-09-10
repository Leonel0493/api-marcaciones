create database resources;

use resources;

create table countries(
	id varchar(45) primary key,
    country varchar(50) not null,
    abbreviation varchar(3) not null,
    flag_img mediumblob null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modified_by varchar(25) null,
    modified_at datetime null,
    enabled boolean default true
);

create table provinces(
	id varchar(45) primary key,
    province varchar(50) not null,
    id_country varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modifed_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    constraint fk_province_country foreign key (id_country) references countries(id)
);

create table cities(
	id varchar(45) primary key,
    city varchar(50) not null,
    id_province varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modifed_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    constraint fk_cities_province foreign key (id_province) references provinces(id)
);

create table documents(
	id varchar(45) primary key,
    document varchar(50) not null,
    parttern varchar(150) null,
    id_country varchar(50) not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modifed_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    constraint fk_document_country foreign key (id_country) references countries(id)
);

create table communication_channels(
	id varchar(45) primary key,
    channel varchar(50) not null,
    parttern varchar(150) null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modifed_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true
);

create table people(
	id varchar(45) primary key,
    names varchar(150) not null,
    surnames varchar(150) not null,
    id_country varchar(50) not null,
    date_of_birth date not null,
    created_by varchar(25) not null,
    created_at datetime not null,
    modifed_by varchar(25) null,
	modified_at datetime null,
    enabled boolean default true,
    constraint fk_nationality foreign key (id_country) references countries(id)
);