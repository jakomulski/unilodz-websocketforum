package com.jakomulski.forumcms.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerMapping;

@Controller
public class UploadedContentController {
	@RequestMapping("/users/{username}/**")
	public String foo(@PathVariable("username") String username, HttpServletRequest request) {
		String path = (String) request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE);
		String bestMatchPattern = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
		String filePath = new AntPathMatcher().extractPathWithinPattern(bestMatchPattern, path);
		if (filePath.isEmpty()) {
			filePath = "index.html";
		}
		String url = "/uploads/" + username + "/" + filePath;
		return url;
	}
}
