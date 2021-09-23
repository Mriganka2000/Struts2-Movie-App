package com.highradius.dao;

import java.util.List;  
import java.util.ArrayList;
import java.util.HashMap;

import com.highradius.model.Movie;
import com.highradius.util.HibernateUtil;
import com.sun.java.swing.plaf.motif.resources.motif;

import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;  
import org.hibernate.Transaction; 

public class MovieDAO extends HibernateUtil {
	
	public void addMovie(Movie movie) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		String title = movie.getTitle();
		System.out.println("The movie name is :-" + title);
		System.out.println(movie);
		session.beginTransaction();  
        session.save(movie);  
        session.getTransaction().commit();  
        session.flush();  
        session.close(); 
	}
	
	public void updateMovie(Movie movie) {
		Session session = HibernateUtil.getSessionFactory().openSession();
        session.beginTransaction();
        try {  
	        if(movie != null) {  
	            session.saveOrUpdate(movie);  
	        }  
        } catch (HibernateException e) {  
            e.printStackTrace();  
            session.getTransaction().rollback();  
        }  
        session.getTransaction().commit();        
        session.flush();  
        session.close(); 
	}
	
	public void deleteMovie(int id) {
		Session session = HibernateUtil.getSessionFactory().openSession();  
        session.beginTransaction();
        
        try {
			Movie movie = (Movie) session.load(Movie.class,id);
			if(movie != null) {
	            session.delete(movie);
	        }
		} catch (HibernateException e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        }
        session.getTransaction().commit();
        session.flush();
        session.close();
	}

	@SuppressWarnings("unchecked")
	public List<Movie> getAllMovies() {
		Session session = HibernateUtil.getSessionFactory().openSession();
		List<Movie> allMovies = null;
		
		session.beginTransaction();
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("1", "English");
		map.put("2", "Hindi");
		map.put("3", "Bengali");
		
		try {
			allMovies = session.createCriteria(Movie.class).list();
			int count = allMovies.size();
			System.out.println("No of Record From Dao: " + count);
		} catch (HibernateException e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        }
		
		session.getTransaction().commit();
        session.flush();
        session.close();
        
        return allMovies;
	}
	
	@SuppressWarnings("unchecked")
	public List<Movie> getSearchedMovies(String title) {
		Session session = HibernateUtil.getSessionFactory().openSession();
		List<Movie> allMovies = null;
		
		session.beginTransaction();
		
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("1", "English");
		map.put("2", "Hindi");
		map.put("3", "Bengali");
		
		try {
			Query query = session.createQuery("FROM Movie m WHERE m.title= '" + title + "'");
			allMovies = query.list();
			int count = allMovies.size();
			System.out.println("No of Searched Record From Dao: " + count);
		} catch (HibernateException e) {
            e.printStackTrace();
            session.getTransaction().rollback();
        }
		
		session.getTransaction().commit();
        session.flush();
        session.close();
        
        return allMovies;
	}
	
}
