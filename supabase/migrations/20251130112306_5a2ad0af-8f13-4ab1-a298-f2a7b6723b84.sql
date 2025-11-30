-- Create user roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'vip', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create function to check user role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create user_follows table
CREATE TABLE public.user_follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Enable RLS on user_follows
ALTER TABLE public.user_follows ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_follows
CREATE POLICY "Users can view all follows"
ON public.user_follows
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can manage their own follows"
ON public.user_follows
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can delete their own follows"
ON public.user_follows
FOR DELETE
TO authenticated
USING (auth.uid() = follower_id);

-- Create items table
CREATE TABLE public.items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  value DECIMAL(10, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on items
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- RLS policies for items
CREATE POLICY "Anyone can view items"
ON public.items
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage items"
ON public.items
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create giveaway status enum
CREATE TYPE public.giveaway_status AS ENUM ('created', 'ongoing', 'drawing', 'completed', 'cancelled');

-- Create giveaways table
CREATE TABLE public.giveaways (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vip_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status giveaway_status DEFAULT 'created' NOT NULL,
  draw_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  winner_count INTEGER DEFAULT 1 NOT NULL CHECK (winner_count > 0)
);

-- Enable RLS on giveaways
ALTER TABLE public.giveaways ENABLE ROW LEVEL SECURITY;

-- RLS policies for giveaways
CREATE POLICY "Anyone can view giveaways"
ON public.giveaways
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "VIP users can create giveaways"
ON public.giveaways
FOR INSERT
TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'vip') OR 
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "VIP users can update their own giveaways"
ON public.giveaways
FOR UPDATE
TO authenticated
USING (
  auth.uid() = vip_user_id AND
  (public.has_role(auth.uid(), 'vip') OR public.has_role(auth.uid(), 'admin'))
);

-- Create giveaway_items table (junction table for giveaways and items)
CREATE TABLE public.giveaway_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  giveaway_id UUID REFERENCES public.giveaways(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER DEFAULT 1 NOT NULL CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (giveaway_id, item_id)
);

-- Enable RLS on giveaway_items
ALTER TABLE public.giveaway_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for giveaway_items
CREATE POLICY "Anyone can view giveaway items"
ON public.giveaway_items
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "VIP users can manage their giveaway items"
ON public.giveaway_items
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.giveaways
    WHERE id = giveaway_id
    AND vip_user_id = auth.uid()
  )
);

-- Create giveaway_participants table
CREATE TABLE public.giveaway_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  giveaway_id UUID REFERENCES public.giveaways(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  participation_points INTEGER DEFAULT 1 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (giveaway_id, user_id)
);

-- Enable RLS on giveaway_participants
ALTER TABLE public.giveaway_participants ENABLE ROW LEVEL SECURITY;

-- RLS policies for giveaway_participants
CREATE POLICY "Anyone can view participants"
ON public.giveaway_participants
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Users can participate in giveaways"
ON public.giveaway_participants
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create giveaway_winners table
CREATE TABLE public.giveaway_winners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  giveaway_id UUID REFERENCES public.giveaways(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id UUID REFERENCES public.items(id) ON DELETE SET NULL,
  claimed BOOLEAN DEFAULT false,
  claim_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  claimed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (giveaway_id, user_id)
);

-- Enable RLS on giveaway_winners
ALTER TABLE public.giveaway_winners ENABLE ROW LEVEL SECURITY;

-- RLS policies for giveaway_winners
CREATE POLICY "Anyone can view winners"
ON public.giveaway_winners
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Winners can update their claim status"
ON public.giveaway_winners
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create giveaway_permission_requests table
CREATE TABLE public.giveaway_permission_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE (user_id)
);

-- Enable RLS on giveaway_permission_requests
ALTER TABLE public.giveaway_permission_requests ENABLE ROW LEVEL SECURITY;

-- RLS policies for giveaway_permission_requests
CREATE POLICY "Users can view their own requests"
ON public.giveaway_permission_requests
FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create their own requests"
ON public.giveaway_permission_requests
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update requests"
ON public.giveaway_permission_requests
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_items_updated_at
BEFORE UPDATE ON public.items
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_giveaways_updated_at
BEFORE UPDATE ON public.giveaways
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_permission_requests_updated_at
BEFORE UPDATE ON public.giveaway_permission_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_follows_follower ON public.user_follows(follower_id);
CREATE INDEX idx_user_follows_following ON public.user_follows(following_id);
CREATE INDEX idx_giveaways_vip_user ON public.giveaways(vip_user_id);
CREATE INDEX idx_giveaways_status ON public.giveaways(status);
CREATE INDEX idx_giveaways_draw_time ON public.giveaways(draw_time);
CREATE INDEX idx_participants_giveaway ON public.giveaway_participants(giveaway_id);
CREATE INDEX idx_participants_user ON public.giveaway_participants(user_id);
CREATE INDEX idx_winners_giveaway ON public.giveaway_winners(giveaway_id);
CREATE INDEX idx_winners_user ON public.giveaway_winners(user_id);