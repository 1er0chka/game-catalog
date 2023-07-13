/*
package com.example.eazygames.service;

import com.example.eazygames.dto.UserDetailsImpl;
import com.example.eazygames.entity.User;
import com.example.eazygames.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private UserRepository userRepository;

    public boolean registry(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        // проверочка на существование
        return true;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            // норм ошибку
            throw new UsernameNotFoundException("Not found");
        }
        return new UserDetailsImpl(user);
    }
}
*/
