package com.nocountry.retrueque.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtUtils {
  @Value("${jwt.secret.key}")
  private String secretKey;

  @Value("${jwt.time.expiration}")
  private long sessionExpiration;

  @Value("${email.token.time.expiration}")
  private long emailTokenExpiration;

  private SecretKey getKey() {
    byte[] keyBites = Decoders.BASE64.decode(secretKey);
    return Keys.hmacShaKeyFor(keyBites);
  }

  public String generateSessionToken(UserDetails userDetail) {
    Map<String, Object> extraClaims = new HashMap<>();
    return Jwts.builder()
            .claims(extraClaims)
            .subject(userDetail.getUsername())
            .issuedAt(new Date(System.currentTimeMillis()))
            .expiration(Date.from(Instant.now().plus(sessionExpiration, ChronoUnit.MILLIS)))
            .signWith(this.getKey(), Jwts.SIG.HS256)
            .compact();
  }

  public String generateEmailVerificationToken(UserDetails userDetail) {
    return Jwts.builder()
            .subject(userDetail.getUsername())
            .issuedAt(new Date())
            .expiration(Date.from(Instant.now().plus(emailTokenExpiration, ChronoUnit.MILLIS)))
            .signWith(this.getKey(), Jwts.SIG.HS256)
            .compact();
  }

  private Claims getAllClaims(String token){
    return Jwts.parser()
            .verifyWith(this.getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
  }
  private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = this.getAllClaims(token);
    return claimsResolver.apply(claims);
  }

  public String getUsernameFromToken(String token) {
    return this.getClaim(token, Claims::getSubject);
  }

  public boolean isTokenExpired(String token){
    Date expirationDate = this.getClaim(token, Claims::getExpiration);
    return expirationDate.before(new Date());
  }

  public boolean isTokenValid(String token, UserDetails userDetails) {
    final String email = getUsernameFromToken(token);
    return email.equals(userDetails.getUsername()) &&
            !isTokenExpired(token);
  }

}
