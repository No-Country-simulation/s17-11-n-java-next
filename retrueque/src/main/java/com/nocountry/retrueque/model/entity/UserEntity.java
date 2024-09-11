package com.nocountry.retrueque.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="users", uniqueConstraints = {@UniqueConstraint(columnNames = "email")})
public class UserEntity implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(length = 50)
  private String name;
  @Column(length = 50)
  private String last_name;
  @Column(length = 100, unique = true)
  private String email;
  private String password;
  private boolean isEnabled;
  private boolean isDeleted;
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @PrePersist
  public void onCreate(){
    this.isDeleted = false;
    this.isEnabled = false;
    this.createdAt = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name="role_id", nullable = false)
  private Role role;

  @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
  private UserProfileEntity profile;

  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
  private List<Services> services;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_"+role.getName());
    return List.of(authority);
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }
}
