CREATE TABLE [Site]
(
	[site_id] int IDENTITY(1,1) PRIMARY KEY,
	[name] varchar(20) NOT NULL UNIQUE,
	[user_id] int,
	CONSTRAINT FK_site_order FOREIGN KEY (user_id) REFERENCES [User](user_id)
)