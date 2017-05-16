package com.jakomulski.forumcms.db.models;

import java.io.Serializable;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "[Site]")
@Access(value = AccessType.FIELD)
public class SiteEntity implements Serializable {

	private static final long serialVersionUID = -7199678662352880334L;

	public SiteEntity() {
		// default constructor
	}

	public SiteEntity(String name, UserEntity user) {
		this.name = name;
		this.user = user;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "[site_id]")
	private Long id;

	@Column(name = "[name]")
	private String name;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public UserEntity getUser() {
		return user;
	}
}
