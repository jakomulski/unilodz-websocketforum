package com.jakomulski.forumcms.models;

public class File {
	public enum FileType {
		FILE, FOLDER
	}

	private final String name;
	private final FileType type;

	public File(String name, FileType type) {
		this.name = name;
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public FileType getType() {
		return type;
	}

}
