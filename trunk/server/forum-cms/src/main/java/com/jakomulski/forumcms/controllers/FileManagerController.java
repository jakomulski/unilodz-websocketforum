package com.jakomulski.forumcms.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jakomulski.forumcms.models.File.FileType;

@RestController
@RequestMapping("/files")
public class FileManagerController {

	@Autowired
	private HttpServletRequest request;

	@PreAuthorize("#oauth2.hasScope('read')")
	@RequestMapping(method = RequestMethod.POST, path = "/directories")
	public List<com.jakomulski.forumcms.models.File> get(@RequestBody List<String> relativePath,
			OAuth2Authentication auth) {

		// Map<String, List<String>> map = new HashMap<>();
		String fullPath = getBaseUserPath(auth.getName()) + String.join("\\", relativePath);
		List<com.jakomulski.forumcms.models.File> directories = getDirectories(fullPath);
		// map.put("directories", directories);

		return directories;
	}

	private List<com.jakomulski.forumcms.models.File> getDirectories(String directory) {
		File file = new File(directory);
		if (file.list() == null) {
			return Collections.emptyList();
		} else {
			return Arrays.asList(file.list()).stream().map(this::convertToFile).collect(Collectors.toList());
		}
	}

	private com.jakomulski.forumcms.models.File convertToFile(String fileName) {
		FileType type = fileName.contains(".") ? FileType.FILE : FileType.FOLDER;
		return new com.jakomulski.forumcms.models.File(fileName, type);
	}

	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public Object uploadFile(@ModelAttribute("file") MultipartFile file, @ModelAttribute("path") ArrayList<String> path,
			OAuth2Authentication auth) {
		if (!file.isEmpty()) {
			try {
				saveFile(file, auth.getName() + "\\" + String.join("\\", path));
			} catch (IllegalStateException | IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return null;
	}

	private void saveFile(MultipartFile file, String username) throws IllegalStateException, IOException {
		String realPathtoUploads = getBaseUserPath(username);
		if (!new File(realPathtoUploads).exists()) {
			new File(realPathtoUploads).mkdir();
		}

		String orgName = file.getOriginalFilename();
		String filePath = realPathtoUploads + orgName;
		File dest = new File(filePath);
		file.transferTo(dest);
	}

	private String getBaseUserPath(String username) {
		String uploadsDir = "/uploads/" + username + "/";
		return request.getServletContext().getRealPath(uploadsDir);
	}
}
