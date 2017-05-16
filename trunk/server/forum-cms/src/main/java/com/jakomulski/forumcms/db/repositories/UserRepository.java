package com.jakomulski.forumcms.db.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.jakomulski.forumcms.db.models.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
	@Query(name = "SELECT * FROM [User] WHERE [username] = :username")
	UserEntity findByUsername(@Param("username") String username);
}
