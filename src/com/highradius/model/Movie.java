package com.highradius.model;

import javax.persistence.Column;  
import javax.persistence.Entity;  
import javax.persistence.GeneratedValue;  
import static javax.persistence.GenerationType.IDENTITY;  
import javax.persistence.Id;  
import javax.persistence.Table;  
import javax.persistence.Temporal;  
import javax.persistence.TemporalType;

@Entity  
@Table(name="film" ,catalog="sakila")  
public class Movie implements java.io.Serializable {
	
	private static final long serialVersionUID = -7073889617484974327L;
	private int id;
	private String title;
	private String description;
	private String releaseYear;
	private String languageId;
	private String director;
	private String rating;
	private String specialFeature;
	
	public Movie() {
		super();
	}
	
	public Movie(String title, String description, String releaseYear, String languageId, String director,
			String rating, String specialFeature) {
		super();
		this.title = title;
		this.description = description;
		this.releaseYear = releaseYear;
		this.languageId = languageId;
		this.director = director;
		this.rating = rating;
		this.specialFeature = specialFeature;
	}

	public Movie(int id, String title, String description, String releaseYear, String languageId, String director, String rating, 
			String specialFeature) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.releaseYear = releaseYear;
		this.languageId = languageId;
		this.director = director;
		this.rating = rating;
		this.specialFeature = specialFeature;
	}
	
	@Id @GeneratedValue(strategy=IDENTITY)  
    @Column(name="film_id", unique=true, nullable=false)  
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	@Column(name="title", length=255) 
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	@Column(name="description", length=1000)
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	@Column(name="release_year", length=30)
	public String getReleaseYear() {
		return releaseYear;
	}
	
	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}
	
	@Column(name="language_id")
	public String getLanguageId() {
		return languageId;
	}

	public void setLanguageId(String languageId) {
		this.languageId = languageId;
	}
	
	@Column(name="director", length=255)
	public String getDirector() {
		return director;
	}
	
	public void setDirector(String director) {
		this.director = director;
	}
	
	@Column(name="rating", length=10)
	public String getRating() {
		return rating;
	}
	
	public void setRating(String rating) {
		this.rating = rating;
	}
	
	@Column(name="special_features", length=500)
	public String getSpecialFeature() {
		return specialFeature;
	}
	
	public void setSpecialFeature(String specialFeature) {
		this.specialFeature = specialFeature;
	}

	@Override
	public String toString() {
		return "Movie [id=" + id + ", title=" + title + ", description=" + description + ", releaseYear=" + releaseYear
				+ ", languageId=" + languageId + ", director=" + director + ", rating=" + rating + ", specialFeature="
				+ specialFeature + "]";
	}
	
}

