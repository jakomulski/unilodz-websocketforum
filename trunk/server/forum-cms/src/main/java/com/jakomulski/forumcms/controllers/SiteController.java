package com.jakomulski.forumcms.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.jakomulski.forumcms.models.Site;
import com.jakomulski.forumcms.services.SiteService;

@RestController
@RequestMapping("/site")
public class SiteController {

	@Autowired
	private SiteService siteService;

	@RequestMapping(method = RequestMethod.POST, path = "/add")
	@ResponseBody
	public void addSite(@RequestBody Site site, OAuth2Authentication auth) {
		siteService.addSite(site, auth.getName());
	}

	@RequestMapping(method = RequestMethod.GET, path = "/list")
	public List<Site> getSites(OAuth2Authentication auth) {
		return siteService.getUserSites(auth.getName());
	}
}
