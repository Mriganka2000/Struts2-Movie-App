package com.highradius.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.highradius.dao.MovieDAO;
import com.highradius.model.Movie;
import com.opensymphony.xwork2.ActionSupport;

public class MovieAction extends ActionSupport {
	
    private Movie movie;
	private List<Movie> movieList= new ArrayList<Movie>();
    
	private String title;
	private String description;
	private String releaseYear;
	private String language;
	private String director;
	private String rating;
	private String specialFeature;
	
    private int id;
    private MovieDAO dao;   
    private Integer[] checkBox;
	
    public MovieAction() {
		super();
		this.dao = new MovieDAO();
	}
    
    @Override
	public String execute() {
    	HttpServletResponse response = ServletActionContext.getResponse();
		this.movieList = dao.getAllMovies();
		String jsonString = getJSONFromObject(this.movieList);
		response.setContentType("application/json");
		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		String success = "success";
		return success;
	}
    
    public String add() throws Exception {
    	HashMap<String, String> map = new HashMap<String, String>();
		map.put("English", "1");
		map.put("Hindi", "2");
		map.put("Bengali", "3");
    	try {
    		movie = new Movie(title, description, releaseYear, map.get(language), director, rating, specialFeature);
			dao.addMovie(movie);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	this.movieList = dao.getAllMovies();
    	String success = "success";
		return success;
    }
    
    public String update() throws Exception {
    	HashMap<String, String> map = new HashMap<String, String>();
		map.put("English", "1");
		map.put("Hindi", "2");
		map.put("Bengali", "3");
    	try {
    		movie = new Movie(id, title, description, releaseYear, map.get(language), director, rating, specialFeature);
			dao.updateMovie(movie);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	this.movieList = dao.getAllMovies();
    	String success = "success";
		return success;
    }

    public String delete() throws Exception {
//    	System.out.println("No of Selected Record:-" + checkBox.length);
    	try {
    		System.out.println("No of Selected Record:-" + checkBox.length);
            for (int i=0;i<checkBox.length; i++){
               System.out.println("Selected RecordId:-" + checkBox[i]);
               dao.deleteMovie(checkBox[i]);
            }   
		} catch (Exception e) {
			e.printStackTrace();
		}
    	this.movieList = dao.getAllMovies();
    	String success = "success";
		return success;
    }
    
    public String search() {
    	HttpServletResponse response = ServletActionContext.getResponse();
		this.movieList = dao.getSearchedMovies(title);
		String jsonString = getJSONFromObject(this.movieList);
		response.setContentType("application/json");
		try {
			response.getWriter().write(jsonString);
		} catch (IOException e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		String success = "success";
		return success;
	}
    
	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	public List<Movie> getMovieList() {
		return movieList;
	}

	public void setMovieList(List<Movie> movieList) {
		this.movieList = movieList;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Integer[] getCheckBox() {
		return checkBox;
	}

	public void setCheckBox(Integer[] checkBox) {
		this.checkBox = checkBox;
	}
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getReleaseYear() {
		return releaseYear;
	}

	public void setReleaseYear(String releaseYear) {
		this.releaseYear = releaseYear;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguageId(String language) {
		this.language = language;
	}

	public String getDirector() {
		return director;
	}

	public void setDirector(String director) {
		this.director = director;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getSpecialFeature() {
		return specialFeature;
	}

	public void setSpecialFeature(String specialFeature) {
		this.specialFeature = specialFeature;
	}

	private String getJSONFromObject(List<Movie> responseList) {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		String json = gson.toJson(responseList);
		return json;
	}
	
}
