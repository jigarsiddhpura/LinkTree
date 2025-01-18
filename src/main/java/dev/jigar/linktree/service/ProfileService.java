package dev.jigar.linktree.service;

import dev.jigar.linktree.dto.ProfileRequestDTO;
import dev.jigar.linktree.dto.ProfileResponseDTO;
import dev.jigar.linktree.entity.Profile;
import dev.jigar.linktree.entity.User;
import dev.jigar.linktree.repository.ProfileRepository;
import dev.jigar.linktree.repository.UserRepository;
import dev.jigar.linktree.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public ProfileResponseDTO createProfile(ProfileRequestDTO requestDTO, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Profile profile = new Profile();
        profile.setUser(user);
        profile.setUsername(requestDTO.getUsername());
        profile.setBio(requestDTO.getBio());
        profile.setTitle(requestDTO.getTitle());
        profile.setProfileImage(requestDTO.getProfileImage());
        profile.setIsPublished(false);
        profile.setCreatedAt(LocalDateTime.now());
        profile.setUpdatedAt(LocalDateTime.now());

        Profile savedProfile = profileRepository.save(profile);
        return new ProfileResponseDTO(savedProfile);
    }

    public Profile getProfileById(UUID profileId) {
        return profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
    }

    public ProfileResponseDTO updateProfile(UUID profileId, ProfileRequestDTO requestDTO) {
        Profile existing = getProfileById(profileId);

        existing.setUsername(requestDTO.getUsername());
        existing.setBio(requestDTO.getBio());
        existing.setProfileImage(requestDTO.getProfileImage());
        existing.setIsPublished(false);
        existing.setUpdatedAt(LocalDateTime.now());

        Profile saved = profileRepository.save(existing);
        return new ProfileResponseDTO(saved);
    }

    public int profileCount(UUID userId) {
        return profileRepository.profileCountbyUserId(userId);
    }

    // The ::new syntax is called a method reference, specifically a constructor reference in this case. It's a shorthand way to refer to a constructor.
    // .map(ProfileResponseDTO::new) is equivalent to .map(profile -> new ProfileResponseDTO(profile)) 

    public List<ProfileResponseDTO> getAllProfilesForUser(UUID userId) {
        List<Profile> profiles = profileRepository.findByUserId(userId);
        return profiles.stream()
                    .map(ProfileResponseDTO::new)
                    .toList();
    }

    public boolean isUsernameUnique(String username) {
        return profileRepository.findByUsername(username) == null;
    }
}
