package com.jakomulski.forumcms.db.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "[User]")
@Access(value = AccessType.FIELD)
public class UserEntity implements Serializable {

	private static final long serialVersionUID = 6996956261098034515L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "[user_id]")
	private Long id;

	@Column(name = "[username]")
	private String username;

	@Column(name = "[email]")
	private String email;

	@Column(name = "[password]")
	private String password;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	List<SiteEntity> sites;

	UserEntity() {
		// default constructor
	}

	public UserEntity(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public String getEmail() {
		return email;
	}

	public String getPassword() {
		return password;
	}

	public List<SiteEntity> getSites() {
		if (sites == null)
			return new ArrayList<>();
		return sites;
	}

	@Transient
	public void addSite(SiteEntity entity) {
		sites.add(entity);
	}
}
