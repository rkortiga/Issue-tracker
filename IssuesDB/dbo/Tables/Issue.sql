CREATE TABLE [dbo].[Issue] (
    [Id]          INT           IDENTITY (1, 1) NOT NULL,
    [Title]       VARCHAR (100) NOT NULL,
    [Description] TEXT          NOT NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);

