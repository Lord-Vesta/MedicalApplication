create database medical;

use medical;

show tables;

CREATE table
    CredentialData (
        Email varchar(50),
        Password longtext,
        Id int auto_increment PRIMARY KEY,
        roles varchar(5),
        flag bool
    );

CREATE TABLE
    personalInfo (
        flag bool,
        Id INT PRIMARY KEY,
        firstName VARCHAR(50) NOT NULL,
        lastName VARCHAR(50) NOT NULL,
        mobileNumber VARCHAR(15) NOT NULL,
        dateOfBirth DATE NOT NULL,
        age tinyint unsigned,
        weight DECIMAL(5, 2),
        height VARCHAR(15),
        Bmi float,
        countryOfOrigin VARCHAR(50),
        isDiabetic BOOLEAN,
        hasCardiacIssues BOOLEAN,
        hasBloodPressureConcerns BOOLEAN,
        diseaseType VARCHAR(255),
        diseaseDescription TEXT
    );

CREATE TABLE
    FamilyData (
        flag bool,
        Id int primary key,
        FathersName varchar(50),
        FathersAge int,
        FathersCountry varchar(50),
        MothersName varchar(50),
        mothersAge int,
        motherCountry varchar(50),
        diabetic bool,
        preDiabetic bool,
        CardiacPast bool,
        cardiacPresent bool,
        bloodPressure bool
    );

CREATE TABLE
    UploadedDocuments (
        flag bool,
        Id INT PRIMARY KEY,
        aadharCardFront VARCHAR(255),
        aadharCardBack VARCHAR(255),
        medicalInsuranceCardFront VARCHAR(255),
        medicalInsuranceCardBack VARCHAR(255)
    );

select
    *
from
    UploadedDocuments;

select
    *
from
    FamilyData;

select
    *
from
    personalInfo;

select
    *
from
    CredentialData;