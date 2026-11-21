import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Heart,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Feather,
  Music,
  CheckCircle2,
  Stars,
} from 'lucide-react';

// ============================================================================
// 1. CENTRALIZED PROPOSAL CONFIGURATION
// ============================================================================
export interface ShayariItem {
  id: number;
  category:
    | 'Mohabbat'
    | 'Ishq'
    | 'Teri Muskurahat'
    | 'Zindagi'
    | 'Forever Together'
    | 'Marriage and Commitment';
  lines: string[];
  meaning: string;
}

export const PROPOSAL_CONFIG = {
  partnerName: 'Barsha',
  senderName: 'Shourya',
  intro: {
    greeting: 'Hey Barsha... ❤️',
    teaser: 'Shourya ne kuch dil se likha hai sirf tumhare liye...',
    cta: 'Open My Heart 💌',
  },
  hero: {
    eyebrow: 'Sirf Tumhare Liye — From Shourya',
    title: 'For My Barsha',
    subtitle:
      'Duniya mein bahut log milte hain, par tumhare jaisa apnapan kahin aur nahi mila.',
  },
  sectionA: {
    badge: 'Kyun Tum Sabse Khaas Ho',
    heading: 'Barsha, Tum Meri Sabse Pyaari Aadat Ho ❤️',
    paragraphs: [
      'Sach bataun toh pehle din bas nikalte rehte the. Par jab se tum meri zindagi mein aayi ho, chhoti-chhoti baatein bhi yaadgaar lagne lagi hain. Tumhari hasi, tumhara bachpana, aur bina kuch kahe meri baat samajh jaana—yeh sab mujhe har roz tumhare aur kareeb le aata hai.',
      'Jab bhi din thaka hua hota hai ya dimaag mein bahut kuch chal raha hota hai, bas tumse thodi der baat kar lene se sab theek lagne lagta hai. Tumhare saath rehna bilkul ghar jaisa sukoon deta hai.',
      'Barsha, tum sirf meri pasand nahi ho—tum meri best friend ho, mera sukoon ho, aur meri zindagi ka sabse khoobsurat hissa ho.',
    ],
    highlights: [
      { label: 'Mera Sukoon', detail: 'Jahan saari thakan aur tension khatam ho jaati hai' },
      { label: 'Meri Muskurahat', detail: 'Tumhari pyaari aur thodi si pagal harkaton ki wajah se' },
      { label: 'Mera Hamesha', detail: 'Aaj, kal, aur poori zindagi ke liye' },
    ],
  },
  specialStory: {
    badge: 'Kyun Tum Sabse Khaas Ho',
    heading: 'Kyun Tum Sabse Khaas Ho, Barsha ❤️',
    paragraphs: [
      'Barsha, tum meri bahut achhi dost thi, aur ek waqt aisa bhi tha jab maine tumhe khone ki umeed mein apni saari umeedein kho di thi, lekin aaj tum phir se meri zindagi mein ho aur woh umeed dobara jaag gayi hai. Tum kabhi meri crush thi, lekin shayad himmat nahi juta paaya ki tumhe apne dil ki baat bata sakun. Aaj bhi darr lagta hai tumhe khone se, kyunki tumhare liye jo feelings hain, woh aaj bhi waisi hi hain.',
      'Main nahi jaanta meri kahani aage kahan tak jaayegi, na hi ye jaanta hoon ki humara future kya hoga, lekin itna zaroor jaanta hoon ki tum meri kahani ka ek bahut khoobsurat hissa ban chuki ho. Hum online mile, humari baatein shayad zyada nahi hui, lekin pata nahi kyun tumse ek alag hi attachment ho gayi. Shayad 1.5 saal pehle kisi aur ke liye kabhi aisi feelings thi, lekin aaj jo ehsaas tumhare liye hai, woh mere liye bahut khaas hai.',
      'Main tumse koi bade-bade vaade nahi karna chahta, bas itna chahta hoon ki agar kismat ne humein ek saath likha hai, toh main tumhare saath apni poori zindagi ki kahani likhna chahta hoon.',
    ],
    thankYouBold: 'Thank you, Barsha,',
    thankYouRest:
      'meri zindagi mein dobara woh khushi aur umeed laane ke liye. Thank you meri kahani ka itna khoobsurat hissa banne ke liye.',
    finalLead: 'Aur aakhir mein bas ek sawaal...',
    finalQuestion:
      'Kya tum meri kahani ka hissa bankar, meri humsafar banogi? Kya tum mujhse shaadi karogi? ❤️',
    loveDeclaration: 'I Love You, Barsha. ❤️',
  },
  loveLetter: {
    heading: 'Dil Se Ek Chhota Sa Khat 💌',
    salutation: 'Meri Pyaari Barsha,',
    paragraphs: [
      'Mujhe pata hai main saamne baith kar hamesha apni feelings acche se bol nahi paata, isliye socha aaj sab kuch likh kar tumhe bata doon. Jis din se tum meri life mein aayi ho, har cheez pehle se zyada khoobsurat aur aasaan lagne lagi hai.',
      'Mujhe tumhari har ek cheez se pyaar hai—tumhari aankhon ki chamak, tumhara sabki parwah karna, khush hone par tumhara bachchon jaisa khilkhilana, aur kabhi-kabhi tumhara pyaara sa gussa bhi. Tumhe chahna mere liye koi faisla nahi tha, bas dil ne khud-ba-khud tumhe chun liya.',
      'Mujhe tumhare saath sirf kuch acche pal nahi chahiye. Mujhe subah ki pehli chai se lekar raat ki lambi baaton tak, har mushkil aur har khushi mein bas tumhara haath pakad kar chalna hai.',
      'Thank you meri life mein aane ke liye, Barsha. Chahe kuch bhi ho jaaye, mera dil hamesha sirf tumhe hi chunega.',
    ],
    signOff: 'Hamesha Sirf Tumhara,',
    signature: 'Shourya ❤️',
  },
  shayariCategories: [
    'All',
    'Mohabbat',
    'Ishq',
    'Teri Muskurahat',
    'Zindagi',
    'Forever Together',
    'Marriage and Commitment',
  ] as const,
  shayaris: [
    {
      id: 1,
      category: 'Mohabbat',
      lines: [
        'Tere naam se shuru hoti hai har subah meri,',
        'Tere khayalon pe dhalti hai har shaam meri,',
        'Barsha, mohabbat sirf ek lafz nahi mere liye,',
        'Tu hi toh hai poori ki poori pehchaan meri.',
      ],
      meaning: 'Every dawn begins with your name, Barsha—you are my whole identity.',
    },
    {
      id: 2,
      category: 'Mohabbat',
      lines: [
        'Bina kahe jo dil ki har baat samajh jaaye,',
        'Woh khoobsurat ehsaas ho tum,',
        'Hazaaron ki bheed mein bhi jo sirf apna lage,',
        'Meri mohabbat ka woh sabse pyaara raaz ho tum.',
      ],
      meaning: 'You understand my unspoken heart—my sweetest secret in a crowd of thousands.',
    },
    {
      id: 3,
      category: 'Mohabbat',
      lines: [
        'Chahat itni hai ki lafzon mein simat nahi sakti,',
        'Teri jagah is dil mein koi aur le nahi sakti,',
        'Barsha, har dua mein bas tujhe hi maanga hai,',
        'Kyunki tujhse badhkar koi khushi ho nahi sakti.',
      ],
      meaning: 'No words can contain how deeply I cherish you; you are my every prayer.',
    },
    {
      id: 4,
      category: 'Ishq',
      lines: [
        'Teri aankhon ki gehrai mein kho jaane ko jee chahta hai,',
        'Har pal bas tera hi ho jaane ko jee chahta hai,',
        'Yeh ishq nahi toh aur kya hai ae Barsha,',
        'Tujhe dekh kar khud ko bhool jaane ko jee chahta hai.',
      ],
      meaning: 'Looking into your eyes makes me forget the world and belong only to you.',
    },
    {
      id: 5,
      category: 'Ishq',
      lines: [
        'Ishq woh nahi jo duniya ko dikhaya jaaye,',
        'Ishq woh hai jo rooh mein basaya jaaye,',
        'Aur jab se tum mili ho mujhe Barsha,',
        'Dil chahta hai har janam bas tumhe hi paaya jaaye.',
      ],
      meaning: 'True love lives in the soul—and I wish to find you in every lifetime.',
    },
    {
      id: 6,
      category: 'Ishq',
      lines: [
        'Sukun milta hai jab tu paas hoti hai,',
        'Teri har ek baat behad khaas hoti hai,',
        'Ishq ki kitaab ka sabse haseen panna hai tu,',
        'Jise padh kar har dhadkan ko aas hoti hai.',
      ],
      meaning: 'Peace lives wherever you are; you are the finest page in my book of love.',
    },
    {
      id: 7,
      category: 'Teri Muskurahat',
      lines: [
        'Teri ek muskurahat pe saari duniya waar doon,',
        'Teri khushi ke liye har gham ko haar doon,',
        'Barsha, jab tu muskuraati hai toh lagta hai,',
        'Jaise chaandni raat ko main aur nikhaar doon.',
      ],
      meaning: 'I would trade the whole world just to keep that radiant smile on your face.',
    },
    {
      id: 8,
      category: 'Teri Muskurahat',
      lines: [
        'Phoolon ki khushboo bhi pheeki pad jaati hai,',
        'Jab tu halke se apni palkein jhuka kar muskuraati hai,',
        'Meri saari thakan ek pal mein mit jaati hai,',
        'Jab meri Barsha mere saamne khilkhilaati hai.',
      ],
      meaning: 'Even flowers pale beside your shy smile; your laughter erases all my weariness.',
    },
    {
      id: 9,
      category: 'Teri Muskurahat',
      lines: [
        'Kisi ne poocha jannat kaisi dikhti hai,',
        'Maine muskura kar tera chehra yaad kar liya,',
        'Teri hasi mein jo sukoon chhupa hai Barsha,',
        'Us ek pal ne mera har kal aabaad kar diya.',
      ],
      meaning: 'When asked what paradise looks like, I simply pictured your smile.',
    },
    {
      id: 10,
      category: 'Zindagi',
      lines: [
        'Zindagi ke safar mein manzil ki kise fikar hai,',
        'Jab humsafar hi itna khoobsurat mil gaya ho,',
        'Barsha, tere aane se zindagi gulzar ho gayi,',
        'Jaise sookhe baagh mein phir se phool khil gaya ho.',
      ],
      meaning: 'With a companion as wonderful as you, the journey itself becomes paradise.',
    },
    {
      id: 11,
      category: 'Zindagi',
      lines: [
        'Har mod par tera haath thaam kar chalna hai,',
        'Tere saath hi har mausam mein dhalna hai,',
        'Zindagi chhoti ho ya lambi kya farq padta hai,',
        'Bas har saans mein tera hi naam padhna hai.',
      ],
      meaning: 'I want to walk every turn holding your hand, breathing your name.',
    },
    {
      id: 12,
      category: 'Zindagi',
      lines: [
        'Kal tak jo zindagi ek adhoori kahani thi,',
        'Aaj tere saath woh mukammal kitaab ban gayi,',
        'Barsha, tu meri zindagi ki woh roshni hai,',
        'Jo mere har andhere ka jawaab ban gayi.',
      ],
      meaning: 'Yesterday life was an unfinished story; with you, it became a masterpiece.',
    },
    {
      id: 13,
      category: 'Forever Together',
      lines: [
        'Na chaand chahiye na sitaaron ki baraat chahiye,',
        'Mujhe toh bas har janam tera saath chahiye,',
        'Waqt badal jaaye, mausam badal jaayein bhale,',
        'Mere haathon mein hamesha tera haath chahiye.',
      ],
      meaning: 'I need neither moon nor stars—only your hand in mine through every season.',
    },
    {
      id: 14,
      category: 'Forever Together',
      lines: [
        'Sath chalenge toh har raasta aasaan hoga,',
        'Har khwab humara ek din aasmaan hoga,',
        'Barsha, hamesha ke liye tera saath maanga hai,',
        'Jahan sirf pyaar aur humara jahaan hoga.',
      ],
      meaning: 'Together every path is effortless; forever with you is my only universe.',
    },
    {
      id: 15,
      category: 'Forever Together',
      lines: [
        'Umr bhar tera intezaar bhi manzoor hai,',
        'Tere sang har safar mujhe qubool hai,',
        'Hamesha saath rehne ka waada hai tujhse Barsha,',
        'Tu meri zindagi ka sabse pyaara usool hai.',
      ],
      meaning: 'I promise to stand beside you for a lifetime—you are my heart’s truest vow.',
    },
    {
      id: 16,
      category: 'Marriage and Commitment',
      lines: [
        'Saat pheron ke bandhan mein tujhe apna banana hai,',
        'Apni har khushi aur ghar ko tere naam se sajana hai,',
        'Barsha, kya banogi tum meri humsafar hamesha ke liye,',
        'Mujhe poori zindagi bas tumhe hi chahna hai.',
      ],
      meaning: 'I want to adorn our home with your name and cherish you through sacred vows.',
    },
    {
      id: 17,
      category: 'Marriage and Commitment',
      lines: [
        'Maang mein tere naam ka sindoor sajaane ka khwab hai,',
        'Tujhe apni dulhan bana kar ghar laane ka khwab hai,',
        'Yeh sirf ek waada nahi, meri rooh ka faisla hai Barsha,',
        'Tere sang poori zindagi bitaane ka khwab hai.',
      ],
      meaning: 'Making you my bride and sharing every tomorrow is my soul’s truest decision.',
    },
    {
      id: 18,
      category: 'Marriage and Commitment',
      lines: [
        'Har subah teri aankhon se din ki shuruat ho,',
        'Har shaam tere saath chai ki pyaari baat ho,',
        'Shaadi ke is pavitra rishte mein bandh jaayein hum,',
        'Aur har janam bas tera hi mere haath mein haath ho.',
      ],
      meaning: 'From morning tea to sacred marriage vows, let every lifetime hold us together.',
    },
  ] as ShayariItem[],
  proposal: {
    introLine1: 'Barsha... ❤️',
    introLine2: 'Ek baat poochni thi tumse...',
    englishQuestion: 'Will You Marry Me?',
    hindiQuestion: 'क्या आप मुझसे शादी करोगी? ❤️',
    yesLabel: 'YES! ❤️',
    noLabel: 'NO 🙈',
    playfulNoMessages: [
      'Arey, ek baar phir soch lo! 🥺',
      'Itni jaldi NO? ❤️',
      'Ek chance toh banta hai!',
      'Dil todogi kya Barsha? 🙈',
      'Dekho YES button kitna pyaara lag raha hai! ✨',
      'Pakka? Main toh sirf tumhara hoon! 💕',
    ],
    celebration: {
      headline: 'She Said YES! ❤️',
      subheadline: 'Barsha, let’s create a beautiful story together.',
      closing: 'Forever starts with a beautiful YES. 💍',
    },
  },
  audio: {
    src: '/audio/romantic-music.mp3',
  },
};

// ============================================================================
// 2. ROMANTIC AUDIO HOOK (Local MP3 with Web Audio Piano Arpeggio Fallback)
// ============================================================================
function useRomanticAudio(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const htmlAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const useSynthFallbackRef = useRef(false);

  const stopSynth = useCallback(() => {
    if (synthTimerRef.current !== null) {
      window.clearInterval(synthTimerRef.current);
      synthTimerRef.current = null;
    }
  }, []);

  const startGentlePianoSynth = useCallback(() => {
    try {
      const AudioContextClass =
        window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const progression = [
        [261.63, 329.63, 392.0, 493.88],
        [220.0, 261.63, 329.63, 392.0],
        [174.61, 220.0, 261.63, 349.23],
        [196.0, 246.94, 293.66, 392.0],
      ];
      let step = 0;

      const playNote = () => {
        if (!audioCtxRef.current) return;
        const now = audioCtxRef.current.currentTime;
        const chord = progression[Math.floor(step / 4) % progression.length];
        const freq = chord[step % chord.length];

        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 1.85);
        step += 1;
      };

      playNote();
      synthTimerRef.current = window.setInterval(playNote, 650);
    } catch {
      // Ignore if audio context is blocked
    }
  }, []);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = 'none';
    audio.onerror = () => {
      useSynthFallbackRef.current = true;
    };
    htmlAudioRef.current = audio;

    return () => {
      audio.pause();
      stopSynth();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [audioSrc, stopSynth]);

  const toggleMusic = useCallback(async () => {
    if (isPlaying) {
      if (htmlAudioRef.current) {
        htmlAudioRef.current.pause();
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      if (!useSynthFallbackRef.current && htmlAudioRef.current) {
        try {
          await htmlAudioRef.current.play();
          setIsPlaying(true);
          return;
        } catch {
          useSynthFallbackRef.current = true;
        }
      }
      startGentlePianoSynth();
      setIsPlaying(true);
    }
  }, [isPlaying, startGentlePianoSynth, stopSynth]);

  return { isPlaying, toggleMusic };
}

// ============================================================================
// 3. FLOATING ROSE PETALS & GLOWING HEARTS CANVAS
// ============================================================================
const RomanticBackdropCanvas: React.FC<{ boostCelebration?: boolean }> = ({
  boostCelebration = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      kind: 'petal' | 'heart' | 'sparkle';
      color: string;
    }

    const colors = ['#D97757', '#C25964', '#E5989B', '#E9C46A', '#B5485D'];
    const count = width < 640 ? 22 : 36;

    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 5,
      speedY: Math.random() * 0.7 + 0.35,
      speedX: (Math.random() - 0.5) * 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: Math.random() * 0.45 + 0.2,
      kind: i % 3 === 0 ? 'heart' : i % 4 === 0 ? 'sparkle' : 'petal',
      color: colors[i % colors.length],
    }));

    const drawHeart = (x: number, y: number, size: number) => {
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(x, y + topCurveHeight);
      ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
      ctx.bezierCurveTo(
        x - size / 2,
        y + (size + topCurveHeight) / 2,
        x,
        y + (size + topCurveHeight) / 1.4,
        x,
        y + size
      );
      ctx.bezierCurveTo(
        x,
        y + (size + topCurveHeight) / 1.4,
        x + size / 2,
        y + (size + topCurveHeight) / 2,
        x + size / 2,
        y + topCurveHeight
      );
      ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
      ctx.closePath();
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const speedMultiplier = boostCelebration ? 2.1 : 1;

      for (const p of particles) {
        p.y += p.speedY * speedMultiplier;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.35;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = boostCelebration ? Math.min(0.85, p.opacity * 1.5) : p.opacity;
        ctx.fillStyle = p.color;

        if (p.kind === 'heart') {
          drawHeart(-p.size / 2, -p.size / 2, p.size * 1.25);
        } else if (p.kind === 'petal') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 0.85, p.size * 0.45, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [boostCelebration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-10"
    />
  );
};

// ============================================================================
// 4. FIREWORKS & CONFETTI CELEBRATION OVERLAY (When Barsha Clicks YES!)
// ============================================================================
const CelebrationFireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      size: number;
    }

    const palette = ['#FDE68A', '#FB7185', '#F43F5E', '#FFF1F2', '#FBBF24', '#F472B6'];
    let sparks: Spark[] = [];

    const spawnBurst = (cx: number, cy: number) => {
      for (let i = 0; i < 55; i++) {
        const angle = (Math.PI * 2 * i) / 55 + (Math.random() - 0.5) * 0.2;
        const velocity = Math.random() * 5.5 + 1.8;
        sparks.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: palette[Math.floor(Math.random() * palette.length)],
          size: Math.random() * 3.5 + 1.8,
        });
      }
    };

    spawnBurst(width * 0.3, height * 0.32);
    spawnBurst(width * 0.7, height * 0.28);
    spawnBurst(width * 0.5, height * 0.22);

    const burstInterval = window.setInterval(() => {
      spawnBurst(
        width * (0.18 + Math.random() * 0.64),
        height * (0.15 + Math.random() * 0.4)
      );
    }, 1150);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      sparks = sparks.filter((s) => s.alpha > 0.02);

      for (const s of sparks) {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;
        s.vx *= 0.985;
        s.alpha -= 0.013;

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(burstInterval);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
};

// ============================================================================
// 5. INTRODUCTION SCREEN: ANIMATED WAX-SEALED ENVELOPE
// ============================================================================
const EnvelopeIntroScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsFadingOut(true);
    }, 1250);
    setTimeout(() => {
      onComplete();
    }, 1900);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-4 transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 35%, #F9EFE6 0%, #EFE0D1 60%, #E3CEBC 100%)',
      }}
    >
      <div
        className="absolute w-80 h-80 sm:w-[460px] sm:h-[460px] rounded-full blur-3xl opacity-45 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F4A261, transparent 70%)' }}
      />

      <div className="relative z-10 text-center mb-8 sm:mb-10 max-w-md">
        <p className="font-script text-5xl sm:text-6xl text-[#4A2525] mb-2">
          {PROPOSAL_CONFIG.intro.greeting}
        </p>
        <p className="font-serif italic text-lg sm:text-xl text-[#7A4949] tracking-wide">
          {PROPOSAL_CONFIG.intro.teaser}
        </p>
      </div>

      {/* Warm Handmade Paper Envelope */}
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[230px] sm:h-[270px] perspective-1000">
        <div className="relative w-full h-full rounded-2xl shadow-[0_22px_55px_rgba(74,37,37,0.22)] bg-gradient-to-br from-[#B8505C] via-[#9E3B47] to-[#7D2935] border border-[#E6B89C]/50 overflow-visible">
          {/* Inner Rising Love Note Card */}
          <div
            className={`absolute left-4 right-4 bg-[#FFFDF9] rounded-xl p-5 text-center shadow-lg border border-[#E6CCB2] transition-all duration-1000 ease-out ${
              isOpening
                ? '-translate-y-24 sm:-translate-y-28 opacity-100 z-20'
                : 'translate-y-4 opacity-95 z-10'
            }`}
            style={{ top: '18px', height: '185px' }}
          >
            <p className="font-script text-4xl text-[#5C242B] mb-1">
              For Barsha ❤️
            </p>
            <p className="font-serif italic text-sm sm:text-base text-[#6E4444]">
              Shourya ne apne dil ki har baat ismein likhi hai...
            </p>
            <div className="mt-3 flex justify-center gap-1.5 text-[#C25964]">
              <Heart className="w-4 h-4 fill-[#C25964]" />
              <Heart className="w-4 h-4 fill-[#C25964]" />
              <Heart className="w-4 h-4 fill-[#C25964]" />
            </div>
          </div>

          {/* Envelope Left & Right Pocket Folds */}
          <div
            className="absolute inset-0 z-20 rounded-2xl pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(168,66,78,0.96) 50%, transparent 50%), linear-gradient(225deg, rgba(145,52,64,0.96) 50%, transparent 50%)',
            }}
          />

          {/* Bottom Pocket Triangle */}
          <div
            className="absolute inset-x-0 bottom-0 h-[62%] z-20 rounded-b-2xl pointer-events-none border-t border-[#F3D5C0]/30"
            style={{
              clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)',
              background: 'linear-gradient(180deg, #B54856 0%, #862D39 100%)',
            }}
          />

          {/* Top Animated Envelope Flap */}
          <div
            className="absolute inset-x-0 top-0 h-[58%] rounded-t-2xl origin-top transition-transform duration-1000 ease-in-out pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 95%)',
              background: 'linear-gradient(180deg, #C75765 0%, #9E3B47 100%)',
              transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
              zIndex: isOpening ? 5 : 30,
            }}
          />

          {/* Terracotta & Gold Wax Heart Seal */}
          <button
            onClick={handleOpenEnvelope}
            aria-label="Break wax seal and open envelope"
            className={`absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-30 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-[0_8px_25px_rgba(92,36,43,0.45)] border-2 border-[#F7E1C6] transition-all duration-700 cursor-pointer ${
              isOpening ? 'scale-0 opacity-0' : 'scale-100 opacity-100 hover:scale-110'
            }`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, #D96B77, #9E3B47 75%, #6B212B)',
            }}
          >
            <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-[#FFF8F0] fill-[#FFF8F0] animate-pulse" />
          </button>
        </div>
      </div>

      {/* Animated CTA Button */}
      <button
        onClick={handleOpenEnvelope}
        className="relative z-20 mt-10 px-8 py-4 rounded-full font-medium text-base sm:text-lg tracking-wide text-[#FFFDF9] bg-gradient-to-r from-[#A8424E] via-[#C25964] to-[#A8424E] shadow-[0_12px_30px_rgba(168,66,78,0.35)] hover:shadow-[0_16px_38px_rgba(168,66,78,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {PROPOSAL_CONFIG.intro.cta}
      </button>
    </div>
  );
};

// ============================================================================
// 6. SECTION C: HANDWRITTEN-STYLE LOVE LETTER
// ============================================================================
const LoveLetterSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="letter"
      ref={sectionRef}
      className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto z-20"
    >
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#8E3B46] bg-[#F5E6D8] border border-[#DFC3AC] mb-4">
          <Feather className="w-3.5 h-3.5 text-[#B8505C]" />
          Dil Ki Baat — Seedhe Tumhare Naam
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#3D1E22]">
          {PROPOSAL_CONFIG.loveLetter.heading}
        </h2>
      </div>

      <div
        className="relative rounded-3xl p-7 sm:p-14 shadow-[0_20px_60px_rgba(74,37,37,0.12)] border border-[#E5CEB8] overflow-hidden"
        style={{
          background:
            'linear-gradient(155deg, #FFFDF9 0%, #FDF6EE 60%, #F9ECE2 100%)',
        }}
      >
        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#C25964]/35 rounded-tl-xl pointer-events-none" />
        <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#C25964]/35 rounded-tr-xl pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#C25964]/35 rounded-bl-xl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#C25964]/35 rounded-br-xl pointer-events-none" />

        <p
          className={`font-script text-4xl sm:text-5xl text-[#8E3B46] mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {PROPOSAL_CONFIG.loveLetter.salutation}
        </p>

        <div className="space-y-5 text-[#4A2C2F] font-serif text-lg sm:text-xl leading-relaxed">
          {PROPOSAL_CONFIG.loveLetter.paragraphs.map((para, index) => (
            <p
              key={index}
              style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              {para}
            </p>
          ))}
        </div>

        <div
          style={{ transitionDelay: '1000ms' }}
          className={`mt-10 pt-6 border-t border-[#E6D0BE] flex flex-col sm:flex-row sm:items-end justify-between gap-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div>
            <p className="font-serif italic text-[#7A4949] text-base sm:text-lg">
              {PROPOSAL_CONFIG.loveLetter.signOff}
            </p>
            <p className="font-script text-4xl sm:text-5xl text-[#8E3B46] mt-1">
              {PROPOSAL_CONFIG.loveLetter.signature}
            </p>
          </div>

          <div
            className="w-12 h-12 rounded-full flex items-center justify-center self-end sm:self-auto shadow-md"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #C25964, #8E3B46)',
            }}
          >
            <Heart className="w-5 h-5 text-[#FFFDF9] fill-[#FFFDF9]" />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 7. SECTION D: INTERACTIVE SHAYARI COLLECTION
// ============================================================================
const ShayariCollectionSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const filteredShayaris =
    selectedCategory === 'All'
      ? PROPOSAL_CONFIG.shayaris
      : PROPOSAL_CONFIG.shayaris.filter((s) => s.category === selectedCategory);

  const activeShayari = filteredShayaris[currentIndex % filteredShayaris.length];

  const handleCategoryChange = (cat: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedCategory(cat);
      setCurrentIndex(0);
      setIsAnimating(false);
    }, 180);
  };

  const handleNextShayari = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredShayaris.length);
      setIsAnimating(false);
    }, 220);
  };

  const handlePrevShayari = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex(
        (prev) => (prev - 1 + filteredShayaris.length) % filteredShayaris.length
      );
      setIsAnimating(false);
    }, 220);
  };

  return (
    <section id="shayari" className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto z-20">
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#8E3B46] bg-[#F5E6D8] border border-[#DFC3AC] mb-4">
          <Heart className="w-3.5 h-3.5 text-[#C25964] fill-[#C25964]" />
          Kuch Alfaaz Tumhare Liye
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#3D1E22]">
          Shayari Jo Sirf Barsha Ke Liye Likhi Hai
        </h2>
        <p className="font-serif italic text-[#7A4949] text-base sm:text-lg mt-2">
          Dil se nikli hui kuch pyaari lines, sirf tumhari muskurahat ke naam
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10">
        {PROPOSAL_CONFIG.shayariCategories.map((category) => {
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer border ${
                active
                  ? 'bg-[#A8424E] text-[#FFFDF9] border-[#A8424E] shadow-[0_8px_20px_rgba(168,66,78,0.28)] scale-105'
                  : 'bg-[#FFFDF9]/85 text-[#6E4444] border-[#E2C9B5] hover:border-[#C25964] hover:text-[#3D1E22]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div
          className="relative rounded-3xl p-8 sm:p-12 border border-[#E5CEB8] shadow-[0_20px_60px_rgba(74,37,37,0.1)] text-center overflow-hidden"
          style={{
            background:
              'linear-gradient(155deg, #FFFDF9 0%, #FBF2EA 100%)',
          }}
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#8E3B46] mb-8">
            <span className="px-3 py-1 rounded-full bg-[#F5E6D8] border border-[#E2C9B5]">
              {activeShayari.category}
            </span>
            <span>
              Shayari {(currentIndex % filteredShayaris.length) + 1} of{' '}
              {filteredShayaris.length}
            </span>
          </div>

          <div
            className={`min-h-[175px] sm:min-h-[190px] flex flex-col items-center justify-center transition-all duration-300 ${
              isAnimating ? 'opacity-0 scale-95 translate-y-2' : 'opacity-100 scale-100 translate-y-0'
            }`}
          >
            <div className="space-y-2.5 sm:space-y-3">
              {activeShayari.lines.map((line, i) => (
                <p
                  key={i}
                  className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#3D1E22] leading-relaxed tracking-wide"
                >
                  “{line}”
                </p>
              ))}
            </div>

            <p className="mt-6 text-xs sm:text-sm italic text-[#8A5A5E] max-w-lg">
              {activeShayari.meaning}
            </p>
          </div>

          <div className="mt-9 pt-6 border-t border-[#EAD6C5] flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handlePrevShayari}
              aria-label="Previous Shayari"
              className="px-4 py-3 rounded-full bg-[#F7EAE0] hover:bg-[#EFE0D1] text-[#5C242B] border border-[#E2C9B5] transition cursor-pointer flex items-center gap-1.5 text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>

            <button
              onClick={handleNextShayari}
              className="px-7 py-3.5 rounded-full font-medium text-sm sm:text-base text-[#FFFDF9] bg-gradient-to-r from-[#A8424E] via-[#C25964] to-[#A8424E] shadow-[0_10px_25px_rgba(168,66,78,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Next Shayari ❤️
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// 8. SECTION E: THE BIG PROPOSAL
// ============================================================================
const BigProposalSection: React.FC<{
  onAcceptProposal: () => void;
  hasAccepted: boolean;
}> = ({ onAcceptProposal, hasAccepted }) => {
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [noAttemptCount, setNoAttemptCount] = useState(0);
  const arenaRef = useRef<HTMLDivElement | null>(null);

  const dodgeNoButton = useCallback(() => {
    setNoAttemptCount((prev) => prev + 1);

    const isMobile = window.innerWidth < 640;
    const maxOffsetX = isMobile ? 75 : 145;
    const maxOffsetY = isMobile ? 58 : 75;

    const randomX =
      (Math.random() > 0.35 ? 1 : -0.35) * (Math.random() * maxOffsetX + 25);
    const randomY = (Math.random() - 0.5) * 2 * maxOffsetY;

    setNoOffset({
      x: Math.round(randomX),
      y: Math.round(randomY),
    });
  }, []);

  const currentNoMessage =
    noAttemptCount > 0
      ? PROPOSAL_CONFIG.proposal.playfulNoMessages[
          (noAttemptCount - 1) % PROPOSAL_CONFIG.proposal.playfulNoMessages.length
        ]
      : null;

  return (
    <section
      id="proposal"
      className="relative py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto z-20"
    >
      <div
        className="relative rounded-[2.25rem] p-8 sm:p-16 text-center border-2 border-[#E2BFA5] shadow-[0_25px_80px_rgba(142,59,70,0.18)] overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 50% 15%, #FFFDF9 0%, #F9ECE2 65%, #F2DFD1 100%)',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[540px] sm:h-[540px] rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #F4A261, #E5989B, transparent)',
          }}
        />

        {!hasAccepted ? (
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F5E2D8] border border-[#DFB69F] mb-6 shadow-md">
              <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-[#B8505C] fill-[#B8505C] animate-bounce" />
            </div>

            <p className="font-script text-5xl sm:text-6xl text-[#8E3B46] mb-2">
              {PROPOSAL_CONFIG.proposal.introLine1}
            </p>
            <p className="font-serif italic text-lg sm:text-2xl text-[#6E4444] mb-8">
              {PROPOSAL_CONFIG.proposal.introLine2}
            </p>

            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#3D1E22] tracking-tight leading-tight">
              {PROPOSAL_CONFIG.proposal.englishQuestion}
            </h2>

            <p className="font-serif text-2xl sm:text-4xl text-[#9E3B47] mt-4 font-medium">
              {PROPOSAL_CONFIG.proposal.hindiQuestion}
            </p>

            <div className="h-10 mt-6 flex items-center justify-center">
              {currentNoMessage && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#F5E2D8] border border-[#D8A48F] text-[#7D2935] text-sm sm:text-base font-medium animate-bounce">
                  {currentNoMessage}
                </span>
              )}
            </div>

            <div
              ref={arenaRef}
              className="relative mt-6 min-h-[150px] sm:min-h-[130px] flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
            >
              <button
                onClick={onAcceptProposal}
                className="relative z-20 px-10 py-4 sm:px-12 sm:py-5 rounded-full font-bold text-lg sm:text-2xl text-[#FFFDF9] bg-gradient-to-r from-[#A8424E] via-[#C25964] to-[#A8424E] shadow-[0_14px_35px_rgba(168,66,78,0.4)] hover:shadow-[0_18px_45px_rgba(168,66,78,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-[#FFFDF9]"
              >
                {PROPOSAL_CONFIG.proposal.yesLabel}
              </button>

              <button
                type="button"
                onMouseEnter={dodgeNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  dodgeNoButton();
                }}
                onClick={dodgeNoButton}
                style={{
                  transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
                }}
                className="relative z-10 px-7 py-3.5 rounded-full font-medium text-base sm:text-lg text-[#6E4444] bg-[#FFFDF9] border border-[#D8BEA8] hover:border-[#A8424E] shadow-md transition-transform duration-300 ease-out cursor-pointer select-none"
              >
                {PROPOSAL_CONFIG.proposal.noLabel}
              </button>
            </div>
          </div>
        ) : (
          <div className="relative z-10 py-6 sm:py-10 animate-[fadeIn_0.6s_ease-out]">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#B8505C] to-[#D97757] text-[#FFFDF9] mb-6 shadow-[0_15px_40px_rgba(184,80,92,0.45)] animate-bounce">
              <CheckCircle2 className="w-11 h-11 sm:w-12 sm:h-12" />
            </div>

            <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-[#8E3B46] mb-3">
              Ab Hamesha Saath Rahenge
            </p>

            <h2 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#7D2935] mb-4">
              {PROPOSAL_CONFIG.proposal.celebration.headline}
            </h2>

            <p className="font-serif text-2xl sm:text-3xl text-[#4A2C2F] max-w-2xl mx-auto leading-relaxed">
              {PROPOSAL_CONFIG.proposal.celebration.subheadline}
            </p>

            <div className="mt-8 inline-block px-8 py-4 rounded-2xl bg-[#FFFDF9]/90 border border-[#DFC3AC] shadow-sm">
              <p className="font-serif italic text-xl sm:text-2xl text-[#8E3B46]">
                {PROPOSAL_CONFIG.proposal.celebration.closing}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// 9. MAIN APPLICATION ROOT
// ============================================================================
export function App() {
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState(false);
  const [hasAcceptedProposal, setHasAcceptedProposal] = useState(false);
  const { isPlaying, toggleMusic } = useRomanticAudio(PROPOSAL_CONFIG.audio.src);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen text-[#3D1E22] selection:bg-[#C25964] selection:text-white overflow-x-hidden relative"
      style={{
        background:
          'linear-gradient(180deg, #FDF8F3 0%, #F8EDE3 35%, #F4E4D7 70%, #EFE0D1 100%)',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:wght@400;500;600;700&display=swap');

        .font-script {
          font-family: 'Caveat', cursive;
        }
        .font-serif {
          font-family: 'Lora', Georgia, serif;
        }
        body {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          scroll-behavior: smooth;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <RomanticBackdropCanvas boostCelebration={hasAcceptedProposal} />

      {hasAcceptedProposal && <CelebrationFireworksCanvas />}

      {!hasOpenedEnvelope && (
        <EnvelopeIntroScreen onComplete={() => setHasOpenedEnvelope(true)} />
      )}

      <header className="fixed top-4 inset-x-0 z-40 px-4 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-[#FFFDF9]/85 backdrop-blur-xl border border-[#E5CEB8] shadow-[0_10px_30px_rgba(74,37,37,0.1)] max-w-4xl w-full">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <Heart className="w-4 h-4 text-[#B8505C] fill-[#B8505C] group-hover:scale-125 transition-transform" />
            <span className="font-script text-3xl text-[#5C242B] leading-none">
              Barsha
            </span>
          </button>

          <div className="hidden md:flex items-center gap-5 text-xs uppercase tracking-[0.16em] text-[#6E4444]">
            <button
              onClick={() => scrollToSection('special')}
              className="hover:text-[#A8424E] transition cursor-pointer"
            >
              Special
            </button>
            <button
              onClick={() => scrollToSection('letter')}
              className="hover:text-[#A8424E] transition cursor-pointer"
            >
              Letter
            </button>
            <button
              onClick={() => scrollToSection('shayari')}
              className="hover:text-[#A8424E] transition cursor-pointer"
            >
              Shayari
            </button>
            <button
              onClick={() => scrollToSection('proposal')}
              className="text-[#9E3B47] font-semibold hover:text-[#5C242B] transition cursor-pointer"
            >
              Forever 💍
            </button>
          </div>

          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              isPlaying
                ? 'bg-[#A8424E] text-[#FFFDF9] border-[#A8424E] shadow-[0_4px_15px_rgba(168,66,78,0.3)]'
                : 'bg-[#F7EAE0] text-[#5C242B] border-[#E2C9B5] hover:bg-[#EFE0D1]'
            }`}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#FDE68A]" />
                <span>Playing Melody</span>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-[#A8424E]" />
                <span>Play Music</span>
              </>
            )}
          </button>
        </nav>
      </header>

      <main className="relative z-20">
        <section className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-4 pt-28 pb-12 max-w-5xl mx-auto">
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[520px] sm:h-[520px] rounded-full blur-3xl opacity-35 pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F4A261, #E5989B, transparent)' }}
          />

          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.22em] text-[#8E3B46] bg-[#FFFDF9]/80 border border-[#DFC3AC] mb-6">
            <Stars className="w-3.5 h-3.5 text-[#C25964]" />
            {PROPOSAL_CONFIG.hero.eyebrow}
          </span>

          <h1 className="font-script text-7xl sm:text-8xl md:text-9xl text-[#5C242B] leading-tight">
            {PROPOSAL_CONFIG.hero.title}
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#6E4444] max-w-2xl mt-5 leading-relaxed">
            “{PROPOSAL_CONFIG.hero.subtitle}”
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToSection('special')}
              className="px-8 py-4 rounded-full font-medium text-sm sm:text-base text-[#FFFDF9] bg-gradient-to-r from-[#A8424E] via-[#C25964] to-[#A8424E] shadow-[0_12px_30px_rgba(168,66,78,0.32)] hover:scale-105 transition-all cursor-pointer"
            >
              Read From My Heart ❤️
            </button>
            <button
              onClick={() => scrollToSection('proposal')}
              className="px-7 py-4 rounded-full font-medium text-sm sm:text-base text-[#5C242B] bg-[#FFFDF9]/90 hover:bg-[#FFFDF9] border border-[#DFC3AC] shadow-sm transition-all cursor-pointer"
            >
              Skip to the Question 💍
            </button>
          </div>
        </section>

        <section
          id="special"
          className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto"
        >
          <div
            className="rounded-3xl p-8 sm:p-14 border border-[#E5CEB8] shadow-[0_20px_60px_rgba(74,37,37,0.1)]"
            style={{
              background:
                'linear-gradient(155deg, #FFFDF9 0%, #FBF3EB 100%)',
            }}
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-[0.2em] text-[#8E3B46] bg-[#F5E6D8] border border-[#DFC3AC] mb-4">
                <Heart className="w-3.5 h-3.5 text-[#C25964] fill-[#C25964]" />
                {PROPOSAL_CONFIG.specialStory.badge}
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#3D1E22] leading-tight">
                {PROPOSAL_CONFIG.specialStory.heading}
              </h2>
            </div>

            <div className="space-y-6 font-serif text-lg sm:text-xl text-[#4A2C2F] leading-relaxed text-left sm:text-center max-w-3xl mx-auto">
              {PROPOSAL_CONFIG.specialStory.paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}

              <p className="pt-2">
                <strong className="font-semibold text-[#7D2935]">
                  {PROPOSAL_CONFIG.specialStory.thankYouBold}
                </strong>{' '}
                {PROPOSAL_CONFIG.specialStory.thankYouRest}
              </p>

              <div className="pt-6 border-t border-[#E6D0BE] text-center space-y-3">
                <p className="italic text-[#7A4949] text-lg sm:text-xl">
                  {PROPOSAL_CONFIG.specialStory.finalLead}
                </p>
                <p className="font-semibold text-xl sm:text-2xl text-[#5C242B]">
                  {PROPOSAL_CONFIG.specialStory.finalQuestion}
                </p>
                <p className="font-script text-4xl sm:text-5xl text-[#9E3B47] pt-2">
                  {PROPOSAL_CONFIG.specialStory.loveDeclaration}
                </p>
              </div>
            </div>
          </div>
        </section>

        <LoveLetterSection />
        <ShayariCollectionSection />

        <BigProposalSection
          onAcceptProposal={() => setHasAcceptedProposal(true)}
          hasAccepted={hasAcceptedProposal}
        />
      </main>

      <footer className="relative z-20 py-10 px-4 text-center border-t border-[#E5CEB8] text-[#7A4949] text-sm">
        <p className="font-script text-4xl text-[#8E3B46] mb-1">
          Dil Se Sirf Barsha Ke Liye — Tumhara Shourya ❤️
        </p>
        <p className="text-xs tracking-wider uppercase text-[#8A5A5E]">
          Har dhadkan bas tumhara hi naam leti hai
        </p>
      </footer>
    </div>
  );
}

export default App;