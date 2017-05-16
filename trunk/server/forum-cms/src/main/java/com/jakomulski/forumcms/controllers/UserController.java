package com.jakomulski.forumcms.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jakomulski.forumcms.models.User;
import com.jakomulski.forumcms.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.POST, path = "/add")
	public void addUser(@RequestBody User user) {
		userService.addUser(user);
	}
}
