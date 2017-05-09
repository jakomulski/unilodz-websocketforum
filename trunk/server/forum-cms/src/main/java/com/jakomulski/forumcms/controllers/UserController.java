package com.jakomulski.forumcms.controllers;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.jakomulski.forumcms.models.User;

@RestController
@RequestMapping("/user")
public class UserController {

	@RequestMapping(method = RequestMethod.POST, path = "/add")
	public void addUser(@RequestBody User user) {

	}
}
