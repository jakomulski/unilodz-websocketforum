package com.jakomulski.forumcms.services;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jakomulski.forumcms.db.models.UserEntity;
import com.jakomulski.forumcms.db.repositories.UserRepository;
import com.jakomulski.forumcms.models.User;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public boolean isAuthenticated(String username, String password) {
		UserEntity userEntity = userRepository.findByUsername(username);
		String encodedPassword = userEntity.getPassword();
		return passwordEncoder.matches(password, encodedPassword);
	}

	public void addUser(User user) {
		userRepository.save(convert(user));
	}

	private UserEntity convert(User user) {
		String hashedPassword = passwordEncoder.encode(user.getPassword());
		return new UserEntity(user.getUsername(), user.getEmail(), hashedPassword);
	}
}
