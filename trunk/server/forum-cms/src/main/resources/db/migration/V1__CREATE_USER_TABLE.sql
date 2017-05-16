CREATE TABLE [User]
(
	[user_id] int IDENTITY(1,1) PRIMARY KEY,
    [username] varchar(20) NOT NULL UNIQUE,  
    [password] char(60) NOT NULL,
    [email] varchar(50) NOT NULL
)
