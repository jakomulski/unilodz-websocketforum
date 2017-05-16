package com.jakomulski.forumcms.models;

public class Site {
	private String name;
	private String description;

	public Site() {
		// default constructor
	}

	public Site(String name, String description) {
		this.name = name;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public String getDescription() {
		return description;
	}
}
