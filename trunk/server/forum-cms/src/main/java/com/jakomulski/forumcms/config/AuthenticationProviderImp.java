package com.jakomulski.forumcms.config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import com.jakomulski.forumcms.services.UserService;

@Component
public class AuthenticationProviderImp implements AuthenticationProvider {

	@Autowired
	UserService userService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		String name = authentication.getName();
		String password = authentication.getCredentials().toString();

		if (userService.isAuthenticated(name, password)) {
			// use the credentials
			// and authenticate against the third-party system
			return new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
		} else {
			return null;
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}
}