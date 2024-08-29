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
@Table(name = "users")
public class UserEntity implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(length = 50)
  private String name;
  @Column(length = 100)
  private String email;
  private String password;
  private boolean isEnabled;
  private String dniFrontUrl;
  private String dniBackUrl;
  private boolean isBanned;
  @Column(length = 30)
  private String phone;
  private boolean isDeleted;
  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @PrePersist
  public void onCreate(){
    this.isDeleted = false;
    this.isEnabled = false;
    this.isBanned = false;
    this.createdAt = LocalDateTime.now();
  }

  @ManyToOne
  @JoinColumn(name="role_id", nullable = false)
  private Role role;

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
