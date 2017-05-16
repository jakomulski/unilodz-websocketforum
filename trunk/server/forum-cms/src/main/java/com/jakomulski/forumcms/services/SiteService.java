package com.jakomulski.forumcms.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jakomulski.forumcms.db.models.SiteEntity;
import com.jakomulski.forumcms.db.models.UserEntity;
import com.jakomulski.forumcms.db.repositories.UserRepository;
import com.jakomulski.forumcms.models.Site;

@Service
@Transactional
public class SiteService {
	@Autowired
	private UserRepository userRepository;

	public void addSite(Site site, String username) {
		UserEntity userEntity = userRepository.findByUsername(username);
		SiteEntity siteEntity = new SiteEntity(site.getName(), userEntity);
		userEntity.addSite(siteEntity);
		userRepository.save(userEntity);
	}

	public List<Site> getUserSites(String username) {
		UserEntity userEntity = userRepository.findByUsername(username);
		return userEntity.getSites().stream().map(this::convert).collect(Collectors.toList());
	}

	private Site convert(SiteEntity siteEntity) {
		return new Site(siteEntity.getName(), "");
	}
}
